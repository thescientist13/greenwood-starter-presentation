import { greenwoodThemeStarterPresentation } from './index.js';
import { greenwoodPluginImportRaw } from '@greenwood/plugin-import-raw';

const packageJson = await import(new URL("./package.json", import.meta.url), { with: { type: "json" } }).default;
const packageName = packageJson.name;

class MyThemePackDevelopmentResource {
  constructor(compilation, options) {
    this.compilation = compilation;
    this.options = options;
    this.extensions = ['*'];
  }

  async shouldResolve(url) {
    return process.env.__GWD_COMMAND__ === 'develop' && url.pathname.indexOf(`/node_modules/${packageName}/`) >= 0;
  }

  async resolve(url) {
    const { pathname, searchParams } = url;
    const params = searchParams.size > 0
      ? `?${searchParams.toString()}`
      : '';
    const { userWorkspace } = this.compilation.context;
    const workspaceUrl = pathname.split(`/node_modules/${packageName}/dist/`)[1];

    return new Request(new URL(`./${workspaceUrl}${params}`, userWorkspace));
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