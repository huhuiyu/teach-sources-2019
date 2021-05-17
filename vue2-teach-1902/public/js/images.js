(function() {
  // console.log(SparkMD5.hash('abc'));
  let app = null;
  new Vue({
    el: '#app',
    data() {
      return {
        // 登录用户信息
        loginUser: ajax.loadUser(),
        tbUser: {
          username: '',
          password: ''
        },
        imgcode: '',
        imgSrc: '',
        result: '',
        list: []
      };
    },
    methods: {
      getImgUrl(fid) {
        return ajax.getFileUrl(fid);
      },
      queryImages() {
        // 查询相册图片
        ajax.post(
          '/file/query',
          {
            page: { pageNumber: 1, pageSize: 5 },
            tbFile: {
              contentType: 'image/',
              fileinfo: '相册图片'
              // 相册图片---阿里云---https://huhuiyu.top
            }
          },
          function(data) {
            console.log(data);
            app.list = data.resultData.list;
          }
        );
      },
      login() {
        // 密码加密
        app.tbUser.password = SparkMD5.hash(app.tbUser.password);
        ajax.post(
          '/user/login',
          {
            tbUser: app.tbUser,
            imgcode: app.imgcode
          },
          function(data) {
            app.getImgCode();
            app.tbUser.password = '';
            app.result = data.message;
            console.log('登录结果：', data);
            if (data.success) {
              // 保存用户信息
              ajax.saveUser(data.resultData.tbUser);
              app.loginUser = data.resultData.tbUser;
              // 查询用户的相册
              app.queryImages();
            }
          }
        );
      },
      getImgCode() {
        // 获取图片校验码
        ajax.post(
          '/tools/imageCode',
          {},
          function(data) {
            app.imgSrc = data.message;
          },
          'get'
        );
      }
    },
    created() {
      app = this;
      app.getImgCode();
      app.queryImages();
    }
  });
})();
