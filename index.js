import fs from 'fs';
import path from 'path';
import { fileURLToPath, URL } from 'url';

const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

const greenwoodThemeStarterPresentation = (options = {}) => [{
  type: 'context',
  name: `${packageJson.name}:context`,
  provider: (compilation) => {
    const templateLocation = options.__isDevelopment // eslint-disable-line no-underscore-dangle
      ? path.join(compilation.context.userWorkspace, 'layouts')
      : fileURLToPath(new URL('dist/layouts', import.meta.url));

    return {
      templates: [
        templateLocation
      ]
    };
  }
}];

export {
  greenwoodThemeStarterPresentation
};