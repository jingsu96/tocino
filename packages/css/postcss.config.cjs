const autoprefixer = require('autoprefixer');
const sass = require('@csstools/postcss-sass');
const scss = require('postcss-scss');
const scssImport = require('postcss-import');
const { join } = require('path');
const path = require('path');
const fs = require('fs');

module.exports = {
  map: {
    sourcesContent: false,
    annotation: true,
  },
  customSyntax: scss,
  parser: scss,
  plugins: [
    scssImport,
    sass({
      includePaths: [join(__dirname, 'node_modules')],
      outputStyle: process.env.CSS_MINIFY === '0' ? 'expanded' : 'compressed',
    }),
    autoprefixer,
    // require('postcss-custom-properties-fallback')({
    //   importFrom: [
    //     () => {
    //       const primitiveFallbacks = [];
    //       let customProperties = {};
    //       for (const filePath of primitiveFallbacks) {
    //         const fileData = fs.readFileSync(
    //           path.join(__dirname, './node_modules/@primer/primitives/tokens-next-private/fallbacks/', filePath),
    //           'utf8',
    //         );
    //         customProperties = { ...customProperties, ...JSON.parse(fileData) };
    //       }

    //       return { customProperties: customProperties };
    //     },
    //   ],
    // }),
  ],
};
