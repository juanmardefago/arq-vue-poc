var webpack = require("webpack");

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        "process.env": {
          VUE_APP_BACKEND_URL: JSON.stringify(process.env.VUE_APP_BACKEND_URL)
        }
      })
    ]
  }
};
