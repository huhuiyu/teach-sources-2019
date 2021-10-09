<template>
  <div>
    <div>{{ title }}</div>
    <div>另一个页面的vuex变量{{ counter }}</div>
  </div>
</template>
<script>
export default {
  name: 'VuexOther',
  data() {
    return {
      title: '另外一个vuex页面',
    };
  },
  computed: {
    counter() {
      return this.$store.state.counter;
    },
  },
};
</script>
