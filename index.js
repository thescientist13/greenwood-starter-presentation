const packageJson = require('./package.json');
const path = require('path');

module.exports = () => [{
  type: 'context',
  name: `${packageJson.name}:context`,
  provider: (options = {}) => {
    const { name } = packageJson;
    const baseDistDir = `node_modules/${name}/dist`;
    const templateLocation = options.__isDevelopment // eslint-disable-line no-underscore-dangle
      ? path.join(__dirname, `${baseDistDir}/layouts`)
      : path.join(process.cwd(), 'src/layouts');

    return {
      templates: [
        templateLocation
      ]
    };
  }
}];