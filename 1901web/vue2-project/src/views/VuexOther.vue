<template>
  <div>
    <div>{{ title }}</div>
    <div>vuex变量是全局的:{{ count }}</div>
  </div>
</template>
<script>
export default {
  name: 'VuexOther',
  data() {
    return {
      title: '另一个vuex演示页面'
    };
  },
  computed: {
    count() {
      return this.$store.state.count;
    }
  }
};
</script>
