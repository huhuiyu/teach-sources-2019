(function () {
  new Vue({
    el: '#app',
    data() {
      return {
        title: '测试页',
        echo: '',
        result: {}
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
    }
  });
})();
