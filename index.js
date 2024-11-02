import { ResourceInterface } from '@greenwood/cli/src/lib/resource-interface.js';
import fs from 'fs';

const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

class GraphResolverLoader extends ResourceInterface {
  constructor(compilation) {
    super(compilation);
  }

  shouldResolve(url) {
    return url.pathname === '/graph.json' && process.env.__GWD_COMMAND__ === 'develop';
  }

  resolve() {
    return new Request(new URL('./graph.json', this.compilation.context.scratchDir));
  }
}

const greenwoodThemeStarterPresentation = (options = {}) => [{
  type: 'context',
  name: `${packageJson.name}:context`,
  provider: (compilation) => {
    const layoutsLocation = options.__isDevelopment // eslint-disable-line no-underscore-dangle
      ? new URL('./templates/', compilation.context.userWorkspace)
      : new URL('./dist/templates/', import.meta.url);

    return {
      layouts: [
        layoutsLocation
      ]
    };
  }
}, {
  type: 'resource',
  name: `${packageJson.name}:resource`,
  provider: (compilation) => new GraphResolverLoader(compilation)
}];

export {
  greenwoodThemeStarterPresentation
};