<template>
  <div>
    <div>{{ title }}</div>
    <!-- 自身的部分 -->
    <div>
      vuex的变量：{{ counter }}
      <button @click="changeVuex">修改vuex的变量</button>
      <button @click="actionChangeVuex">Action修改vuex的变量</button>
      <button @click="toOther">跳转其它页面</button>
    </div>
    <!-- 组件的部分 -->
    <hr />
    <div>
      <VuexSub></VuexSub>
    </div>
  </div>
</template>
<script>
import VuexSub from '../components/VuexSub.vue';

export default {
  name: 'Vuex',
  components: { VuexSub },
  data() {
    return {
      title: 'vuex的主页面',
    };
  },
  computed: {
    counter() {
      return this.$store.state.counter;
    },
  },
  methods: {
    changeVuex() {
      this.$store.commit('changeCounter');
    },
    actionChangeVuex() {
      let promise = this.$store.dispatch('changeCounter');
      promise
        .then(function () {
          console.log('异步处理commit');
        })
        .catch(function (err) {
          console.error(err);
        });
    },
    toOther() {
      this.$router.push('/vuexother');
    },
  },
};
</script>
