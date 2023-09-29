const StyleDictionary = require('style-dictionary');

const { DARK, LIGHT, WEB } = require('./scripts/helper/const/index.cjs');
const { parsers } = require('./scripts/helper/configs/base.cjs');
const { getWebConfig } = require('./scripts/helper/platforms/web.cjs');
const { camelCase, kebabCase } = require('./scripts/helper/transforms/index.cjs');
const { cssPropAsValue, cssPropAsValueCommon, normalize } = require('./scripts/helper/source/index.cjs');

function getConfigByPlatform(platform, theme) {
  switch (platform) {
    case WEB:
      return getWebConfig(theme);

    default:
      throw new Error('Platform not found');
  }
}

function generateConfig(brand, platform, theme) {
  return {
    parsers,
    source: ['./tokens/**/*.json'],
    platforms: getConfigByPlatform(platform, theme),
  };
}

// formats

StyleDictionary.registerFormat({
  name: 'js/token-data',
  formatter: cssPropAsValue,
});

StyleDictionary.registerFormat({
  name: 'common/token-data',
  formatter: cssPropAsValueCommon,
});

StyleDictionary.registerFormat({
  name: 'json/token-normalize',
  formatter: normalize,
});

// transforms

StyleDictionary.registerTransform({
  type: 'name',
  name: 'name/cti/ps-kebab',
  transformer: kebabCase,
});

StyleDictionary.registerTransform({
  type: 'name',
  name: 'name/cti/ps-camel',
  transformer: camelCase,
});

// run

const brands = {
  items: ['tocion'],
  results: {
    tocion: {
      platforms: [WEB],
      themes: [LIGHT, DARK],
    },
  },
};

brands.items.map((brandName) => {
  const brand = brands.results[brandName];

  brand.platforms.map((platform) => {
    brand.themes.map((theme) => {
      const styleDictionary = StyleDictionary.extend(generateConfig(brandName, platform, theme));
      styleDictionary.buildAllPlatforms();
    });
  });
});
