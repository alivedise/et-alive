const { gitDescribe , gitDescribeSync } = require('git-describe');

process.env.VUE_APP_GIT_HASH = gitDescribeSync().hash;

module.exports = {
  lintOnSave: false,

  publicPath: process.env.NODE_ENV === 'production'
    ? '/vue-gbm-alive/'
    : '/',

  transpileDependencies: [
    'vuetify',
  ],

  chainWebpack: (config) => {
    config
      .plugin('html')
      .tap((args) => {
        args[0].meta = {
          cache: { 'http-equiv': 'cache-control', content: 'no-cache' },
        };
        return args;
      });
  },

  pwa: {
    name: 'ETADB',
    themeColor: '#0186d1',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    iconPaths: {
      favicon32: 'favicon.ico',
      favicon16: 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon: 'favicon.ico',
      msTileImage: 'favicon.ico',
    },
  },
};
