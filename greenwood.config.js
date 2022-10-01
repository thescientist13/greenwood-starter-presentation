import fs from 'fs';
import { greenwoodThemeStarterPresentation } from './index.js';
import { greenwoodPluginImportCss } from '@greenwood/plugin-import-css';
import path from 'path';
import { ResourceInterface } from '@greenwood/cli/src/lib/resource-interface.js';

const packageName = JSON.parse(fs.readFileSync(path.join(process.cwd(), './package.json'), 'utf-8')).name;

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

export default {  
  plugins: [
    greenwoodPluginImportCss(),
    greenwoodThemeStarterPresentation({
      __isDevelopment: true
    }),
    {
      type: 'resource',
      name: `${packageName}:resource`,
      provider: (compilation, options) => new MyThemePackDevelopmentResource(compilation, options)
    }
  ]
};