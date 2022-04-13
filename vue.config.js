const { defineConfig } = require("@vue/cli-service");
const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;
// MaxListenersExceededWarning:Possible EventEmitter memory leak detected.
require("events").EventEmitter.defaultMaxListeners = 0;
// const publicPath = process.env.NODE_ENV === "production" ? "/" : "/";
const publicPath = "http://localhost:8080/";
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath,
  configureWebpack: {
    optimization: {
      splitChunks: false,
    },
    plugins: [
      new ModuleFederationPlugin({
        name: "train",
        // library: { type: "umd", name: "train" },
        // library: { type: "umd" },
        filename: "remoteEntry.js",
        exposes: {
          "./vue2": "./node_modules/vue/dist/vue",
        },
        // remotes: {
        //   flight: "flight@http://localhost:8081/remoteEntry.js",
        //   hotel: "hotel@http://localhost:8082/remoteEntry.js",
        //   train: "train@http://localhost:8083/remoteEntry.js",
        // },
        // shared: require("./package.json").dependencies,
        shared: ["vue"],
      }),
    ],
  },
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
