(function() {
  let app;

  new Vue({
    el: '#app',
    data() {
      return {
        title: 'vue版本门户',
        result: {},
        indexResult: {}
      };
    },
    methods: {
      imgUrl(fid) {
        return ajax.getFileUrl(fid);
      }
    },
    created() {
      app = this;
      query();
      queryIndex();
    }
  });

  function query() {
    ajax.post(
      '/portable/message/queryAll',
      {
        tbPortableMessage: {
          accessKey: ajax.getAccessKey(),
          messageGroup: 'about'
        },
        page: { pageSize: 100 }
      },
      function(data) {
        console.log(data);
        app.result = ajax.convertData(data.resultData.list);
      }
    );
  }

  function queryIndex() {
    ajax.post(
      '/portable/message/queryAll',
      {
        tbPortableMessage: {
          accessKey: ajax.getAccessKey(),
          messageGroup: 'index'
        },
        page: { pageSize: 100 }
      },
      function(data) {
        console.log(data);
        app.indexResult = ajax.convertData(data.resultData.list);
      }
    );
  }
})();
