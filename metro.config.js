const { getDefaultConfig } = require("expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.extraNodeModules = {
  buffer: require.resolve("buffer/"),
};

module.exports = defaultConfig;
