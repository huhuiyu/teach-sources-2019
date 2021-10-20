module.exports = {
  // 生成环境不需要map文件
  productionSourceMap: !process.env.NODE_ENV 
    === 'production',
  // 项目输出路径
  // outputDir: 'D:\\git\\code.aliyun\\huhuiyu.top.server\\oss-manage-ui',
  // 服务器虚拟路径
  publicPath: process.env.NODE_ENV === 
    'production' ? '/vuex-demo/' : '/',
  // configureWebpack: (config) => {
  //   if (process.env.NODE_ENV === 'production') {
  //     // 为生产环境修改配置...
  //     config.mode = 'production';
  //     config['performance'] = {
  //       //打包文件大小配置
  //       maxEntrypointSize: 1000000,
  //       maxAssetSize: 2000000,
  //     };
  //   }
  // config.externals = {
  //   vue: 'Vue',
  //   'vue-router': 'VueRouter',
  //   vuex: 'Vuex',
  //   'spark-md5': 'SparkMD5',
  //   'qs': 'qs',
  //   'axios': 'axios',
  // };
  // },
}
