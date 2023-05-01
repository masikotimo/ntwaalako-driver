const path = require('path');
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo',"module:metro-react-native-babel-preset"],
    plugins: ['react-native-reanimated/plugin',
      ["module-resolver", {
        root: ["."],
        resolvePath(sourcePath, currentFile) {
          if (
            sourcePath === "react-native" &&
            !(
              (
                currentFile.includes("node_modules/react-native/") || // macos/linux paths
                currentFile.includes("node_modules\\react-native\\")
              ) // windows path
            ) &&
            !(
              currentFile.includes("resolver/react-native/") ||
              currentFile.includes("resolver\\react-native\\")
            )
          ) {
            return path.resolve(__dirname, "resolver/react-native");
          }
          return undefined;
        },
      }],
    ],
  };
};
