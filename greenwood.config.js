const pluginGraphQl = require('@greenwood/plugin-graphql');

module.exports = {
  title: 'My Presentation',
  
  plugins: [
    ...pluginGraphQl()
  ]
}