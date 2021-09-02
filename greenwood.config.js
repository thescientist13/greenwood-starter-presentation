const greenwoodStarterPresentation = require('./index');
const packageName = require('./package.json').name;
const path = require('path');
const pluginImportCss = require('@greenwood/plugin-import-css');
const { ResourceInterface } = require('@greenwood/cli/src/lib/resource-interface');

class MyThemePackDevelopmentResource extends ResourceInterface {
  constructor(compilation, options) {
    super(compilation, options);
    this.extensions = ['*'];
  }

  async shouldResolve(url) {
    // eslint-disable-next-line no-underscore-dangle
    return Promise.resolve((process.env.__GWD_COMMAND__ === 'develop') && url.indexOf(`/node_modules/${packageName}/`) >= 0);
  }

  async resolve(url) {
    const { userWorkspace } = this.compilation.context;
    const workspaceUrl = this.getBareUrlPath(url).split(`/node_modules/${packageName}/dist/`)[1];

    return Promise.resolve(path.join(userWorkspace, workspaceUrl));
  }
}

module.exports = {
  title: 'My Presentation',
  
  plugins: [
    ...pluginImportCss(),
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