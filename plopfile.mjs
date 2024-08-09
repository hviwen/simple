import inquirerAuto from 'inquirer-autocomplete-prompt';
import {dirname} from "node:path";
import {fileURLToPath} from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
import path from 'path';
import fs from 'fs-extra';
import {
  js30Generator,
  cssNWGenerator,
  challengeGenerator,
  infoGenerator,
  frameworkGenerator
} from "./plop_templates/prompts/index.mjs";


export default function (plop) {
  plop.setPrompt('autocomplete', inquirerAuto);

  /*plop.setActionType('copyAssets', function (answers, config, plop) {
    console.log('config', config)

    return new Promise((resolve, reject) => {
      const sourcePath = path.join(__dirname, 'plop_templates', 'assets', 'js30');
      const destPath = path.join(process.cwd(), 'src', 'js30', answers.name, 'assets');
      fs.copy(sourcePath, destPath, {overwrite: true})
        .then(() => {
          resolve(`copy assets to /src/js30/${answers.name}/assets success`);
        })
        .catch((err) => {
          reject(err);
        });
    });
  })
*/

  plop.setGenerator('js30', js30Generator)
  plop.setGenerator('cssNW', cssNWGenerator)
  plop.setGenerator('challenge', challengeGenerator)
  plop.setGenerator('info', infoGenerator)
  plop.setGenerator('framework', frameworkGenerator)
}