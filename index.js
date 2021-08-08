const packageJson = require('./package.json');
const path = require('path');

module.exports = () => [{
  type: 'context',
  name: `${name}:context`,
  provider: () => {
    const { name } = packageJson;
    const baseDistDir = `node_modules/${name}/dist`;

    return {
      templates: [
        path.join(__dirname, `${baseDistDir}/templates`)
      ]
    };
  }
}];