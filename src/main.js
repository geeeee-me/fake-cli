import chalk from "chalk";
import fs from "fs";
import ncp from "ncp";
import path from "path";
import readline from "readline";
import { promisify } from "util";

const access = promisify(fs.access);
const mkDir = promisify(fs.mkdir);
const copy = promisify(ncp);

async function copyTemplateFiles(widgetFolder, options) {
  return copy(options.templateDirectory, widgetFolder, {
    clobber: false,
  });
}

// TODO: lots validation: if folder exists, etc
export async function createWidget(options) {
  options = {
    ...options,
    targetDirectory: options.targetDirectory || process.cwd(),
  };

  const currentFileUrl = import.meta.url;
  const templateDir = path.resolve(
    new URL(currentFileUrl).pathname,
    "../../templates",
    options.template.toLowerCase()
  );

  options.templateDirectory = templateDir;

  const widgetFolder = options.targetDirectory + "/" + options.name;
  console.log(widgetFolder);
  console.log(options);

  // Read dir
  try {
    await access(templateDir, fs.constants.R_OK);
  } catch (err) {
    console.error("%s Invalid template name", chalk.red.bold("ERROR"));
    process.exit(1);
  }

  // Validate
  try {
    // await validatePublicApi(options);
    validateFolderNameDuplication(widgetFolder);
    // validateModuleSelector(options);
  } catch (e) {
    console.error("%s: %s", chalk.red.bold("ERROR"), e.message);
    process.exit(1);
  }

  console.log("Copy widget files");
  await createFolder(widgetFolder);
  await copyTemplateFiles(widgetFolder, options);

  // updatePublicApi(options);
  // updateModule(options);
  await renameWidget(widgetFolder, options);

  console.log("%s Widget ready", chalk.green.bold("Done"));

  return true;
}

async function createFolder(widgetFolder) {
  try {
    await mkDir(widgetFolder);
  } catch (e) {
    console.error(
      "%s Could not create folder: %s",
      chalk.red.bold("ERROR"),
      e.message
    );
    process.exit(1);
  }
}

async function renameWidget(widgetFolder, options) {
  const files = [
    `${widgetFolder}/widget/widget.component.ts`,
    `${widgetFolder}/configurator/configurator.component.ts`,
  ];

  for (const file of files) {
    const fileData = fs.readFileSync(file, "utf-8");
    const result = fileData.replace("{{selector}}", options.name);
    fs.writeFileSync(file, result, "utf8");
  }
}

function updateModule(options) {
  const path = `${options.targetDirectory}/modules.js`;
  const fileData = fs.readFileSync(path, "utf-8");
  const la = fileData.replace("export default", "");

  try {
    const array = eval(la);

    array.push({
      selector: `${options.name}-widget`,
      modulePath: `${options.name}/widget/widget.module`,
    });
    array.push({
      selector: `${options.name}-configurator`,
      modulePath: `${options.name}/configurator/widget.module`,
    });

    fs.writeFileSync(
      path,
      `export default ${Buffer.from(JSON.stringify(array))}`,
      "utf8"
    );
  } catch (e) {
    console.error(`%s ${e.message}`, chalk.red.bold("ERROR"));
    process.exit(1);
  }
}

function updatePublicApi(options) {
  try {
    const path = `${options.targetDirectory}/public_api.ts`;
    const fileData = fs.readFileSync(path, "utf-8");
    const exportString = `export * as ${options.name} from "./${options.name}"`;

    fs.writeFileSync(path, `${fileData}\n${exportString}`, "utf8");
  } catch (e) {
    console.error(`%s ${e.message}`, chalk.red.bold("ERROR"));
    process.exit(1);
  }
}

function validateFolderNameDuplication(path) {
  if (fs.existsSync(path)) {
    throw new Error(`Such directory already exists: ${path}`);
  }
}

function validateModuleSelector(options) {
  const path = `${options.targetDirectory}/modules.js`;
  const fileData = fs.readFileSync(path, "utf-8");
  const la = fileData.replace("export default", "");
  const sufixes = [`${options.name}-widget`, `${options.name}-configurator`];

  const array = eval(la);

  if (!Array.isArray(array)) {
    throw new Error("modules.js is not array");
  }

  for (const val of array) {
    if (val) {
      if (options.template === "Widget") {
        if (sufixes.includes(val.selector)) {
          throw new Error(
            `In modules.js such selector "${val.selector}" already registered`
          );
        }
      } else if (val.selector === options.name) {
        throw new Error(
          `In modules.js such selector "${val.selector}" already registered`
        );
      }
    }
  }
}

async function validatePublicApi(options) {
  const path = `${options.targetDirectory}/public_api.ts`;

  const rl = readline.createInterface({
    input: fs.createReadStream(path),
    // output: process.stdout,
    console: false,
  });

  for await (const line of rl) {
    const matchImport = line.match(`./${options.name}"`);

    if (matchImport) {
      throw new Error(
        `Such widget "${options.name}" already export from public_api.ts\n ${line}`
      );
    }
  }
}
