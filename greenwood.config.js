const greenwoodStarterPresentation = require('./index');
const packageName = require('./package.json').name;
const path = require('path');
const pluginGraphQL = require('@greenwood/plugin-graphql');
const pluginImportCss = require('@greenwood/plugin-import-css');
const { ResourceInterface } = require('@greenwood/cli/src/lib/resource-interface');

class MyThemePackDevelopmentResource extends ResourceInterface {
  constructor(compilation, options) {
    super(compilation, options);
    this.extensions = ['*'];
  }

  async shouldResolve(url) {
    return Promise.resolve(url.indexOf(`/node_modules/${packageName}/`) >= 0);
  }

  async resolve(url) {
    return Promise.resolve(this.getBareUrlPath(url).replace(`/node_modules/${packageName}/dist/`, path.join(process.cwd(), '/src/')));
  }
}

module.exports = {
  title: 'My Presentation',
  
  plugins: [
    ...pluginImportCss(),
    ...pluginGraphQL(),
    ...greenwoodStarterPresentation({
      __isDevelopment: true
    }),
    {
      type: 'resource',
      name: `${packageName}:resource`,
      provider: (compilation, options) => new MyThemePackDevelopmentResource(compilation, options)
    }
  ]
};