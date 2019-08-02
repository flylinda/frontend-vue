module.exports = {
  runtimeCompiler: true,
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  assetsDir: 'assets',
  // publicPath: './',
  css: {
    loaderOptions: {
      sass: {
        data: '@import "@/styles/global.scss";'
      }
    }
  },
  chainWebpack: config => {
    config.plugin('define').tap(args => {
      const argv = process.argv
      const icourt = argv[argv.indexOf('--icourt-mode') + 1]

      args[0]['process.env'].MODE = `"${icourt}"`

      return args
    })
  },
  configureWebpack: {
    externals: {
      SDK: 'SDK',
      NETCALL: 'NETCALL'
    },
    devServer: {
      open: true,
      // https: true,
      host: 'localhost',
      proxy: {
      }
    }
  }
}
