const path = require("path");
const resolve = dir => path.join(__dirname, dir);
// const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);

module.exports = {
  chainWebpack: config => {
    config.module.rule('pug')
      .test(/\.pug$/)
      .use('pug-html-loader')
      .loader('pug-html-loader')
      .end();
      // 添加别名
    config.resolve.alias
    .set("vue$", "vue/dist/vue.esm.js")
    .set("@", resolve("src"))
    .set("@assets", resolve("src/assets"))
    .set("@scss", resolve("src/assets/scss"))
    .set("@components", resolve("src/components"))
    .set("@request", resolve("src/request"))
    .set("@plugins", resolve("src/plugins"))
    .set("@containers", resolve("src/containers"))
    .set("@router", resolve("src/router"))
    .set("@store", resolve("src/store"))
    .set("@layouts", resolve("src/layouts"))
    .set("@static", resolve("src/static"));
  },
  "transpileDependencies": [
    "vuetify"
  ]
}