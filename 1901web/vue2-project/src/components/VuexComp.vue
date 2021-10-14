<template>
  <div>
    <div>{{ title }}</div>
    <div>组件中的vuex变量：{{ count }}</div>
  </div>
</template>
<script>
export default {
  name: 'VuexComp',
  data() {
    return {
      title: 'vuex测试组件'
    };
  },
  computed: {
    count() {
      return this.$store.state.count;
    }
  }
};
</script>
