function filterByTheme(token, theme) {
  if (token.path.includes(theme)) {
    return token;
  }

  return null;
}

function baseFilter(token) {
  if (['./tokens/space/alias.json', './tokens/shape/alias.json', './tokens/font/alias.json'].includes(token.filePath)) {
    return token;
  }

  return undefined;
}

module.exports = {
  filterByTheme,
  baseFilter,
};
