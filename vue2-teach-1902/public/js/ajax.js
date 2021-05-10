(function() {
  // 服务器端信息
  const server = {
    tokenKey: 'local-token-info',
    saveTokey: function(data) {
      if (data && data.token) {
        localStorage.setItem(server.tokenKey, data.token);
      }
    },
    loadToken: function() {
      return localStorage.getItem(server.tokenKey);
    },
    baseUrl: 'https://huhuiyu.top/teach-demo-service'
  };
  let ajax = {
    post: function(url, params, cb, method) {
      method = method ? method : 'post';
      url = server.baseUrl + url;
      let promise = axios({
        url: url,
        method: method,
        data: Qs.stringify(params),
        headers: {
          token: server.loadToken()
        }
      });
      promise
        .then(function(resp) {
          server.saveTokey(resp.data);
          cb(resp.data);
        })
        .catch(function(error) {
          console.error(error);
          cb({ code: 500, success: false, message: '请求错误' });
        });
    }
  };

  window.ajax = ajax;
})();
