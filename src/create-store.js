import chalk from "chalk";
import fs from "fs";
import ncp from "ncp";
import path from "path";
import { promisify } from "util";

const access = promisify(fs.access);
const mkDir = promisify(fs.mkdir);
const copy = promisify(ncp);

async function copyTemplateFiles(storeFolder, options) {
  return copy(options.templateDirectory, storeFolder, {
    clobber: false,
  });
}

// TODO: lots validation: if folder exists, etc
export async function createStore(options) {
  console.log(options);
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

  const storeFolder = options.targetDirectory + "/" + options.name;

  // Read dir
  try {
    await access(templateDir, fs.constants.R_OK);
  } catch (err) {
    console.error("%s Invalid template name", chalk.red.bold("ERROR"));
    process.exit(1);
  }

  // Validate
  try {
    validateFolderNameDuplication(storeFolder);
  } catch (e) {
    console.error("%s: %s", chalk.red.bold("ERROR"), e.message);
    process.exit(1);
  }

  console.log("Copy widget files");
  await createFolder(storeFolder);
  await copyTemplateFiles(storeFolder, options);

  await renameWidget(storeFolder, options);

  console.log("%s Widget ready", chalk.green.bold("Done"));

  return true;
}

async function createFolder(storeFolder) {
  try {
    await mkDir(storeFolder);
  } catch (e) {
    console.error(
      "%s Could not create folder: %s",
      chalk.red.bold("ERROR"),
      e.message
    );
    process.exit(1);
  }
}

async function renameWidget(storeFolder, options) {
  const files = [
    `${storeFolder}/actions/store.actions.ts`,
    `${storeFolder}/const/feature-name.const.ts`,
    `${storeFolder}/effects/store.effects.ts`,
    `${storeFolder}/facade/store.facade.ts`,
    `${storeFolder}/reducers/store.reducer.ts`,
    `${storeFolder}/selectors/store.selector.ts`,
    `${storeFolder}/services/store-api.service.ts`,
    `${storeFolder}/type/store-state.type.ts`,
    `${storeFolder}/store-store.module.ts`,
  ];

  console.log(options);

  for (const file of files) {
    const fileData = fs.readFileSync(file).toString();
    const result = fileData
      .replace(/{{selector}}/g, options.name)
      .replace(/{{Selector}}/g, firstUpper(options.name))
      .replace(/{{SELECTOR}}/g, options.name.toUpperCase());
    fs.writeFileSync(file, result, "utf8");
    fs.renameSync(file, file.replace("store", options.name));
  }
}

function validateFolderNameDuplication(path) {
  if (fs.existsSync(path)) {
    throw new Error(`Such directory already exists: ${path}`);
  }
}

function firstUpper(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
