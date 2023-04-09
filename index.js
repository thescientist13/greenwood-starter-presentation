import fs from 'fs';

const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

const greenwoodThemeStarterPresentation = (options = {}) => [{
  type: 'context',
  name: `${packageJson.name}:context`,
  provider: (compilation) => {
    const templateLocation = options.__isDevelopment // eslint-disable-line no-underscore-dangle
      ? new URL('./layouts/', compilation.context.userWorkspace)
      : new URL('./dist/layouts/', import.meta.url);

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