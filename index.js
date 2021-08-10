const packageJson = require('./package.json');
const path = require('path');

module.exports = () => [{
  type: 'context',
  name: `${packageJson.name}:context`,
  provider: (options = {}) => {
    const templateLocation = options.__isDevelopment // eslint-disable-line no-underscore-dangle
      ? path.join(process.cwd(), 'src/layouts')
      : path.join(__dirname, 'dist/layouts');

    return {
      templates: [
        templateLocation
      ]
    };
  }
}];