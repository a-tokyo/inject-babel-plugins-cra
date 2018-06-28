# inject-babel-plugins-cra
🔧 Injects babel plugins into [create-react-app](https://github.com/facebook/create-react-app) without ejecting.

## Getting started
- add the babel plugins you need to your project. e.g: `yarn add babel-plugin-relay babel-plugin-react-css-modules`.
- create a js script that injects the plugins to your app, let's call it `init.js`.
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
     Array<{ name: string, options?: { [string]: any } }> = []
     ```
- **options**: 
  - description: Options object
  - type:
    ```js
    {
      babelPresetFilePath?: string,
      stringMatcher?: string,
    } = {
      babelPresetFilePath: './node_modules/babel-preset-react-app/index.js',
      stringMatcher: 'const plugins = [',
    }
    ```
