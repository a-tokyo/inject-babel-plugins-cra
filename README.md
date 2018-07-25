# inject-babel-plugins-cra
🔧 Injects babel plugins into [create-react-app](https://github.com/facebook/create-react-app) without ejecting.

[![npm](https://img.shields.io/npm/v/inject-babel-plugins-cra.svg)](https://www.npmjs.com/package/inject-babel-plugins-cra)
[![CircleCI](https://img.shields.io/circleci/project/github/RedSparr0w/node-csgo-parser.svg)](https://circleci.com/gh/A-Tokyo/inject-babel-plugins-cra/edit#badges)
[![npm](https://img.shields.io/npm/l/inject-babel-plugins-cra.svg)](https://github.com/A-Tokyo/inject-babel-plugins-cra/blob/master/LICENSE)

## Getting started
### Install the module
Run `yarn add --dev inject-babel-plugins-cra`.

### Usage example
- add the babel plugins you need to your project. e.g: `yarn add babel-plugin-relay babel-plugin-react-css-modules`.
- create a js script that injects the plugins to your app, let's call it `init.js`. e.g:
  ```js
  const injectBabelPluginCRA = require('inject-babel-plugin-cra');
  
  injectBabelPluginCRA([
    // add a simple plugin
    { name: 'babel-plugin-relay' },
    // add a plugin with options
    {
      name: 'babel-plugin-react-css-modules',
      options: {
        generateScopedName: '[path]__[name]__[local]',
      },
    },
  ]);
  ```
- Update your `start` script in `package.json` to call the `init.js` script first.
  - e.g `"start": "node ./init.js && npm-run-all -p watch-css start-js"`

## Docs

#### params:
- **plugins**:
  - description: Plugins to be injected
  - type: 
     ```js
     Array<{
       /* plugin name */
       name: string,
       /* plugin options */
       options?: { [string]: any } 
     }> = []
     ```
- **options?**: 
  - description: Optional advanced options object
  - type:
    ```js
    {
      /* The path to to the babel preset file */
      babelPresetFilePath?: string,
      /* The string to match against before injecting the plugins */
      stringMatcher?: string,
    } = {
      /** For older version of CRA*/
      babelPresetFilePath: './node_modules/babel-preset-react-app/index.js',
      stringMatcher: 'const plugins = [',
    }
    ```
