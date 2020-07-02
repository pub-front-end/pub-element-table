const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

module.exports = {
  configureWebpack: {
    plugins: [
      new LodashModuleReplacementPlugin({
        paths: true
      })
    ],
    externals: {
      axios: {
        commonjs: 'axios',
        commonjs2: 'axios',
        amd: 'axios',
        root: 'Axios'
      }
      // externals: {
      //     lodash: {
      //         commonjs: 'lodash',
      //         commonjs2: 'lodash',
      //         amd: 'lodash',
      //         root: '_'
      //     }
      // }
    }
  }
};
