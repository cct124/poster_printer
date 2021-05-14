module.exports = {
  configureWebpack: {
    devtool: "source-map",
  },
  pluginOptions: {
    electronBuilder: {
      preload: "src/script/preload/index.ts",
      mainProcessWatch: ["src/script"],
    },
  },
};
