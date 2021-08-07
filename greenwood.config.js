const pluginGraphQL = require('@greenwood/plugin-graphql');
const pluginImportCss = require('@greenwood/plugin-import-css');

module.exports = {
  title: 'My Presentation',
  
  plugins: [
    ...pluginImportCss(),
    ...pluginGraphQL()
  ]
};