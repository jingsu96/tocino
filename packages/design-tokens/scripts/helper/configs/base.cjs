const { filterByTheme, baseFilter } = require('../filters/index.cjs');

// filters

function getDefaultFileConfig(theme) {
  return {
    filter: (token) => filterByTheme(token, theme),
  };
}

function getBaseFileConfig() {
  return {
    filter: (token) => baseFilter(token),
  };
}

// transforms

const cssTransforms = ['name/cti/ps-kebab'];
const jsTransforms = ['name/cti/ps-camel'];

module.exports = {
  getDefaultFileConfig,
  getBaseFileConfig,
  cssTransforms,
  jsTransforms,
};
