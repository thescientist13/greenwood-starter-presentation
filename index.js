import fs from 'fs';

const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

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
}];

export {
  greenwoodThemeStarterPresentation
};