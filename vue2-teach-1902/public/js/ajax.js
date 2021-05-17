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
    baseUrl: 'https://huhuiyu.top/teach-demo-service',
    localUserKey: 'local-user-info',
    accessKey: '808d413c-dcb4-4f21-9e8a-521bec008124'
  };
  let ajax = {
    convertData(data) {
      // 转换门户信息的数组成单一json
      console.log('转换前的结果：', data);
      let result = {};
      for (let i = 0; i < data.length; i++) {
        let message = data[i];
        result[message.messageKey] = message.message;
      }
      console.log('转换后的结果：', result);
      return result;
    },
    getAccessKey() {
      return server.accessKey;
    },
    // 获取文件下载链接
    getFileUrl(fid) {
      return server.baseUrl + '/file/download?request_token=' + server.loadToken() + '&tbFile.fid=' + fid;
    },
    saveUser(user) {
      localStorage.setItem(server.localUserKey, JSON.stringify(user));
    },
    loadUser() {
      let user = localStorage.getItem(server.localUserKey);
      if (!user) {
        return null;
      }
      return JSON.parse(user);
    },
    post: function(url, params, cb, method) {
      method = method ? method : 'post';
      url = server.baseUrl + url;
      let promise = axios({
        url: url,
        method: method,
        data: Qs.stringify(params, { allowDots: true }),
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
