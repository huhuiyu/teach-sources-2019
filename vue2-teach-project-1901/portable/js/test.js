(function () {
  new Vue({
    el: '#app',
    data() {
      return {
        title: '测试页',
        echo: '',
        result: {},
        portable: {}
      };
    },
    methods: {
      ajaxTest() {
        let app = this;
        ajax.send(
          '/',
          {
            echo: SparkMD5.hash(app.echo)
          },
          function (data) {
            app.result = data;
          }
        );
      }
    },
    created() {
      let app = this;
      ajax.send(
        '/portable/message/queryAll',
        {
          page: { pageSize: 100 },
          tbPortableMessage: {
            accessKey: ajax.getAccessKey(),
            messageGroup: 'test'
          }
        },
        function (data) {
          app.portable = ajax.convertData(
            data.resultData.list);
        }
      );
    }
  });
})();
