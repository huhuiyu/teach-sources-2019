<template>
  <div>
    <div>{{ title }}</div>
    <div>另一个页面的vuex变量{{ counter }}</div>
    <div>
      一点Promise的知识
      <input type="text" v-model="info" />
      <button @click="promiseAction">promise</button>
      <span>{{ promiseInfo }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'VuexOther',
  data() {
    return {
      title: '另外一个vuex页面',
      promiseInfo: 'hold',
      info: '',
    };
  },
  methods: {
    promiseAction() {
      let app = this;
      // Promise一般用于长时间任务，或者是不确定时间的任务
      // 例如ajax,又比如等待用户选择的对话框
      // 参数中的resolve表示正常应答的function
      // 调用该方法会触发Promise对象的then模块执行
      // 参数中reject表示异常应答的function
      // 调用该方法会触发Promise对象的catch模块执行
      // 这两个函数的参数随意定制，对应模块的处理函数也要匹配
      let promise = new Promise(function (resolve, reject) {
        if (app.info == 'error') {
          reject('promise异常返回');
        } else {
          setTimeout(function () {
            resolve();
          }, 2000);
        }
      });
      promise
        .then(function () {
          app.promiseInfo = '正确的Promise处理：' + app.info;
        })
        .catch(function (err) {
          app.promiseInfo = err;
        });
    },
  },
  computed: {
    counter() {
      return this.$store.state.counter;
    },
  },
};
</script>
