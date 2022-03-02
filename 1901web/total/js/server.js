let server = {
  url: 'https://huhuiyu.top',
  formatDate(ts) {
    return '导入对象的方法===>' + ts;
  }
};

// 模块式语法，使用导入语法避免冲突，且html页面不需要
// script标记导入，而是使用js通过import导入！！！
export default server;
