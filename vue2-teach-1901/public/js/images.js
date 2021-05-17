// ajax.send('/', { echo: '黑暗骑士' }, function(data) {
//   console.log(data);
// });
(function() {
  let app;
  // SparkMD5.hash
  new Vue({
    el: '#app',
    data() {
      return {
        title: '个人相册',
        imgcode: '',
        tbUser: {
          username: '',
          password: ''
        },
        result: '',
        // 图片src信息
        imgSrc: '',
        loginUser: ajax.loadUser(),
        images: []
      };
    },
    created() {
      app = this;
      app.changeImg();
      if (app.loginUser) {
        app.query();
      }
    },
    methods: {
      imgUrl(fid) {
        return ajax.getFileUrl(fid);
      },
      query() {
        ajax.send(
          '/file/query',
          {
            page: { pageSize: 4, pageNumber: 1 },
            tbFile: {
              contentType: 'image/',
              fileinfo: '相册图片'
            }
          },
          function(data) {
            console.log(data);
            if (data.success) {
              app.images = data.resultData.list;
            }
          }
        );
      },
      changeImg() {
        ajax.send(
          '/tools/imageCode',
          { ts: new Date().getTime() },
          function(data) {
            app.imgSrc = data.message;
          },
          'get'
        );
      },
      login() {
        app.tbUser.password = SparkMD5.hash(app.tbUser.password);
        ajax.send(
          '/user/login',
          {
            imgcode: app.imgcode,
            tbUser: app.tbUser
          },
          function(data) {
            app.result = data.message;
            app.tbUser.password = '';
            app.changeImg();
            // 如果登录成功就保存用户信息
            if (data.success) {
              app.loginUser = data.resultData.tbUser;
              ajax.saveUser(app.loginUser);
              app.query();
            }
          }
        );
      }
    }
  });
})();
