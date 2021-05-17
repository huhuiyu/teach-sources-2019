(function() {
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
        // 服务器数据是数组，例如：
        // [
        // {messageGroup:'a',messageKey:'email',message:'dd@cc'}
        // {messageGroup:'a',messageKey:'copyright','版权所有'}
        //]
        // 希望转换成独立json格式
        // 例如：
        // { email : 'dd@cc',copyright:'版权所有'}
        let info = ajax.convertData(data.resultData.list);
        let email = document.getElementById('email');
        email.innerHTML = info.email;
        document.getElementById('companyName')
          .innerHTML=info.companyName;
      }
    );
  }

  query();
})();
