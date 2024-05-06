import fs from 'fs';
import { greenwoodThemeStarterPresentation } from './index.js';
import path from 'path';
import { ResourceInterface } from '@greenwood/cli/src/lib/resource-interface.js';
import { greenwoodPluginImportRaw } from '@greenwood/plugin-import-raw';

const packageName = JSON.parse(fs.readFileSync(path.join(process.cwd(), './package.json'), 'utf-8')).name;

class MyThemePackDevelopmentResource extends ResourceInterface {
  constructor(compilation, options) {
    super(compilation, options);
    this.extensions = ['*'];
  }

  async shouldResolve(url) {
    // eslint-disable-next-line no-underscore-dangle
    return process.env.__GWD_COMMAND__ === 'develop' && url.pathname.indexOf(`/node_modules/${packageName}/`) >= 0;
  }

  async resolve(url) {
    const { pathname } = url;
    const { userWorkspace } = this.compilation.context;
    const workspaceUrl = pathname.split(`/node_modules/${packageName}/dist/`)[1];

    return new Request(new URL(`./${workspaceUrl}`, userWorkspace));
  }
}

export default {  
  plugins: [
    greenwoodPluginImportRaw(),
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