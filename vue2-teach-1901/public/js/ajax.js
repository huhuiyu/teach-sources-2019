(function() {
  const server = {
    tokenKey: 'local-token-key',
    saveToken: function(data) {
      if (data && data.token) {
        localStorage.setItem(server.tokenKey, data.token);
      }
    },
    loadToken: function() {
      return localStorage.getItem(server.tokenKey);
    },
    baseUrl: 'https://huhuiyu.top/teach-demo-service'
  };

  const ajax = {
    send: function(url, params, cb, method) {
      url = server.baseUrl + url;
      method = method ? method : 'post';
      let promise = axios({
        url: url,
        data: Qs.stringify(params, { allowDots: true }),
        method: method,
        headers: {
          token: server.loadToken()
        }
      });
      promise
        .then(function(resp) {
          server.saveToken(resp.data);
          cb(resp.data);
        })
        .catch(function(error) {
          console.error(error);
          cb({ code: 500, success: false, message: '请求失败' });
        });
    },
    saveUser: function(user) {
      sessionStorage.setItem('local-user-info', JSON.stringify(user));
    },
    loadUser() {
      let user = sessionStorage.getItem('local-user-info');
      if (user) {
        return JSON.parse(user);
      }
      return null;
    },
    getFileUrl(fid) {
      return server.baseUrl + 
        '/file/download?request_token='+server.loadToken()
        +'&tbFile.fid='+fid;
    }
  };

  window.ajax = ajax;
})();
