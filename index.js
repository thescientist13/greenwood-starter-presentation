const packageJson = require('./package.json');
const path = require('path');

module.exports = () => [{
  type: 'context',
  name: `${packageJson.name}:context`,
  provider: () => {

    return {
      templates: [
        path.join(__dirname, 'dist/templates')
      ]
    };
  }
}];