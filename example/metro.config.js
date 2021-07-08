/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const path = require('path');

const root = path.resolve(__dirname, '..');

const extraNodeModules = {
  'react-native-infinite-swipper': root,
};

module.exports = {
  projectRoot: __dirname,
  watchFolders: [root],
  resolver: {
    extraNodeModules: new Proxy(extraNodeModules, {
      get: (target, name) =>
        target[name]
          ? target[name]
          : path.join(process.cwd(), `node_modules/${name}`),
    }),
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};
