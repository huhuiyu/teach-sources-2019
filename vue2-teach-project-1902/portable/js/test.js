(function () {
  new Vue({
    el: '#app',
    data() {
      return {
        title: '测试vue',
        echo: '',
        result: {},
        message: {}
      };
    },
    methods: {
      ajaxTest() {
        let app = this;
        ajax.post(
          '/',
          {
            echo: SparkMD5.hash(this.echo)
          },
          function (data) {
            app.result = data;
          }
        );
      }
    },
    created() {
      let app = this;
      // 测试门户信息获取
      ajax.post(
        '/portable/message/queryAll',
        {
          page: { pageSize: 100 },
          tbPortableMessage: {
            accessKey: ajax.getAccessKey(),
            messageGroup: 'test'
          }
        },
        function (data) {
          let message = ajax.convertData(data.resultData.list);
          console.log(message);
          app.message = message;
        }
      );
    }
  });
})();
