(function () {
  new Vue({
    el: '#app',
    data() {
      return {
        title: '测试vue',
        echo: '',
        result: {}
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
    }
  });
})();
