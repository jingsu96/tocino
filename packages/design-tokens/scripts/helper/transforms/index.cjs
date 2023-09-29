const { DARK } = require('../const/index.cjs');

const ChangeCase = require('change-case');

const DEFAULT_OPTIONS = {
  transform: ChangeCase.camelCaseTransformMerge,
};

function getTokenPath(path) {
  return path.slice(0, -1);
}

function changeDefaultCaseTransform(caseFunction, default_options) {
  return (caseToChange, options) =>
    caseFunction(caseToChange, Object.assign({}, DEFAULT_OPTIONS, default_options, options));
}

function camelCase(token, options) {
  const darkTheme = token.name === DARK;
  const path = darkTheme ? getTokenPath(token.path) : token.path;
  const camelCase = changeDefaultCaseTransform(ChangeCase.camelCase);
  return camelCase([options.prefix].concat(path).join(' '));
}

function kebabCase(token, options) {
  const path = getTokenPath(token.path);
  return ChangeCase.paramCase([options.prefix].concat(path).join(' '));
}

module.exports = {
  camelCase,
  kebabCase,
};
