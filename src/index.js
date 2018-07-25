/* @flow */
import fs from 'fs';
import path from 'path';

const defaultBabelPresetRAFilePath: string =
  './node_modules/babel-preset-react-app/create.js';

const defaultBabelPresetStringMatcher: string = 'const plugins = [';

/**
 * Injects babel plugins into create react app's config
 */
const injectBabelPluginCRA = (
  plugins: Array<{ name: string, options?: { [string]: any } }> = [],
  {
    babelPresetFilePath = defaultBabelPresetRAFilePath,
    stringMatcher = defaultBabelPresetStringMatcher,
  }: { babelPresetFilePath?: string, stringMatcher?: string } = {
    babelPresetFilePath: defaultBabelPresetRAFilePath,
    stringMatcher: defaultBabelPresetStringMatcher,
  }
) => {
  const filePath: string = path.resolve(babelPresetFilePath);
  let babelPresetRAText: string = fs.readFileSync(filePath, 'utf8');
  plugins.forEach(({ name, options = {} }) => {
    if (babelPresetRAText.includes(stringMatcher)) {
      babelPresetRAText = babelPresetRAText.replace(
        stringMatcher,
        `${stringMatcher}
            [
              require.resolve('${name}'), {${Object.keys(options)
          .map(key => `${key}: '${options[key]}'`)
          .join(',')}}
            ],
          `
      );
    } else {
      throw new Error(`Failed to inject ${name}.`);
    }
  });
  fs.writeFileSync(filePath, babelPresetRAText, 'utf8');
};

module.exports = injectBabelPluginCRA;