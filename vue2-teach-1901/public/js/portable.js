(function() {
  let app;

  new Vue({
    el: '#app',
    data() {
      return {
        title: '门户信息展示',
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
    ajax.send(
      '/portable/message/queryAll',
      {
        page: {
          pageNumber: 1,
          pageSize: 100
        },
        tbPortableMessage: {
          accessKey: ajax.getAccessKey(),
          messageGroup: 'about'
        }
      },
      function(data) {
        console.log(data);
        let result = ajax.convertData(data.resultData.list);
        console.log('转换后的结果：', result);
        app.result = result;
      }
    );
  }

  function queryIndex() {
    ajax.send(
      '/portable/message/queryAll',
      {
        page: {
          pageNumber: 1,
          pageSize: 100
        },
        tbPortableMessage: {
          accessKey: ajax.getAccessKey(),
          messageGroup: 'index'
        }
      },
      function(data) {
        console.log(data);
        let result = ajax.convertData(data.resultData.list);
        console.log('转换后的结果：', result);
        app.indexResult = result;
        let eletitle = document.querySelector('title');
        eletitle.innerHTML = result.title;
      }
    );
  }
})();
