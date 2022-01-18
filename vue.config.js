const { defineConfig } = require("@vue/cli-service");
// MaxListenersExceededWarning:Possible EventEmitter memory leak detected.
require("events").EventEmitter.defaultMaxListeners = 0;
const publicPath = process.env.NODE_ENV === "production" ? "/" : "/";
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "node_modules/awesome-scss-bem/src/bem.scss";@import "@/theme/global.scss";`,
      },
    },
  },
  devServer: {
    proxy: {
      "/api": {
        target: "https://yesno.wtf",
        changeOrigin: true,
      },
    },
  },
});
