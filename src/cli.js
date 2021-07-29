import arg from "arg";
import inquirer from "inquirer";
import { createWidget } from "./main";
import { createStore } from "./create-store";

function parseArgumentIntoOptions(rawArgs) {
  const args = arg(
    {
      "--name": String,
      "--yes": Boolean,
      "--install": Boolean,
      "--targetDirectory": String,
    },
    {
      argv: rawArgs.slice(2),
    }
  );

  return {
    skipPrompts: args["--yes"] || false,
    name: args._[1],
    template: args._[0],
    runInstall: args["--install"] || false,
  };
}

async function promptForMissingOptions(options) {
  const defaultTemplate = "Widget";
  if (options.skipPrompts) {
    return {
      ...options,
      template: options.template || defaultTemplate,
    };
  }

  const mainAnswers = await mainQuestions();

  if (mainAnswers.template === "Widget") {
    const widgetAnswers = await widgetQuestions();

    return {
      ...options,
      template: options.template || mainAnswers.template,
      targetDirectory: mainAnswers.targetDirectory || null,
      name: mainAnswers.name.toLowerCase(),
      libsToIncludeConfigurator:
        widgetAnswers.libsToIncludeConfigurator || undefined,
      libsToIncludeWidget: widgetAnswers.libsToIncludeWidget || undefined,
    };
  } else if (mainAnswers.template === "Store") {
    return {
      ...options,
      targetDirectory: mainAnswers.targetDirectory || null,
      template: options.template || mainAnswers.template,
      name: mainAnswers.name.toLowerCase(),
    };
  } else {
    console.error("Plugins not supported yet");
    process.exit(1);

    // return {
    //   ...options,
    //   template: options.template || answers.template,
    //   name: options.name || answers.name,
    //   libsToInclude: answers.libsToInclude || undefined,
    // };
  }
}

export async function cli(args) {
  let options = parseArgumentIntoOptions(args);
  options = await promptForMissingOptions(options);

  if (options.template === "Widget") {
    await createWidget(options);
  } else if (options.template === "Store") {
    await createStore(options);
  }
}

async function mainQuestions() {
  const q = [
    {
      type: "list",
      name: "template",
      message: "Please choose wich project template to use",
      choices: ["Widget", "Store", "Plugin"],
    },
    {
      type: "input",
      name: "name",
      message: "Enter feature name",
    },
    {
      type: "input",
      name: "targetDirectory",
      message: "Path to create selected feature (default ./)",
    },
  ];

  return inquirer.prompt(q);
}

function widgetQuestions() {
  const q = [
    {
      type: "input",
      name: "libsToIncludeConfigurator",
      message:
        "Define which libs to include with configurator(add space between libraries)",
    },
    {
      type: "input",
      name: "libsToIncludeWidget",
      message:
        "Define which libs to include with widget(add space between libraries)",
    },
  ];

  return inquirer.prompt(q);
}

function pluginQuestions() {
  // TODO...
}

function storeQuestions() {}
