module.exports = {
  // 生成环境不需要map文件
  productionSourceMap: !process.env.NODE_ENV === 'production',
  // 部署到真实服务器的路径(不配置就是/)
  // process.env.NODE_ENV是vue判断环境的变量
  // production表示是npm run build的时候
  publicPath: process.env.NODE_ENV === 
    'production' ? '/vuex/' : '/',
};
