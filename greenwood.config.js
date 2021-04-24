const pluginGraphQL = require('@greenwood/plugin-graphql');

module.exports = {
  title: 'My Presentation',
  
  plugins: [
    ...pluginGraphQL()
  ]
};