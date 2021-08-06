const path = require('path');

module.exports = () => [{
  type: 'context',
  name: 'my-theme-pack:context',
  provider: () => {
    return {
      templates: [
        path.join(__dirname, 'dist/templates')
      ]
    };
  }
}];