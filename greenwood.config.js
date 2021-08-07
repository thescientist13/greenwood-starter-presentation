const packageName = require('./package.json').name;
const path = require('path');
const pluginGraphQL = require('@greenwood/plugin-graphql');
const pluginImportCss = require('@greenwood/plugin-import-css');
const { ResourceInterface } = require('@greenwood/cli/src/lib/resource-interface');
const presentationThemePackPlugin = require('./index');

class MyThemePackDevelopmentResource extends ResourceInterface {
  constructor(compilation, options) {
    super(compilation, options);
    this.extensions = ['*'];
  }

  async shouldResolve(url) {
    return Promise.resolve(url.indexOf(`/node_modules/${packageName}/`) >= 0);
  }

  async resolve(url) {
    return Promise.resolve(url.replace(`/node_modules/${packageName}/dist/`, path.join(process.cwd(), '/src/')));
  }
}

module.exports = {
  title: 'My Presentation',
  
  plugins: [
    ...pluginImportCss(),
    ...pluginGraphQL(),
    ...presentationThemePackPlugin(),
    {
      type: 'resource',
      name: 'my-theme-pack:resource',
      provider: (compilation, options) => new MyThemePackDevelopmentResource(compilation, options)
    }
  ]
};