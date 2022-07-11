#!/usr/bin/env node

import * as yargs from "yargs";
import checkNodeVersion from "./checkNodeVersion";
import { getSubdirectoryFromGithub } from "./utils";

(async () => {
  // Check node version
  checkNodeVersion();

  // Parse arguments
  const options = await yargs
    .usage(
      `
	Outqource CLI for js/ts library" \\
	Usage: npx outqource \\
	-t --template <template> \\
	-s --stack <stack> \\
	-n --name <name> \\
	-b --branch <branch> \\
`
    )
    .options({
      stack: {
        alias: "s",
        describe: "Stack to use",
        type: "string",
      },
      template: {
        alias: "t",
        describe: "Template to use",
        type: "string",
      },
      name: {
        alias: "n",
        describe: "Name of the project",
        type: "string",
        default: "outqource-template",
      },
      branch: {
        alias: "b",
        describe: "Branch to use",
        type: "string",
        default: "dev",
      },
    }).argv;

  if (!options.stack || !options.template) {
    console.log(`Please provide a template and stack`);
    process.exit(1);
  }

  try {
    const [path, newPath] = (() => {
      const pathArray = [options.name, options.stack, options.template];
      return [pathArray.join("/"), pathArray.join("-")];
    })();

    getSubdirectoryFromGithub({
      orgainzation: "outqource",
      repository: "outqource-template",
      projectName: options.name,
      branch: options.branch,
      path,
      newPath,
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
