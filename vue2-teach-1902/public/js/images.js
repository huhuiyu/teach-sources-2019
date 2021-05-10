// 测试ajax功能
ajax.post('/', { echo: '黑暗骑士' }, function(data) {
  console.log(data);
});
// 用户详细信息
// 昵称,文字简介,微信二维码，用户头像,电话,职位
