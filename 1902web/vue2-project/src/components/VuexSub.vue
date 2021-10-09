<template>
  <div>
    <div>{{ title }}</div>
    <div>
      组件中的vuex变量：{{ counter }}
      <button @click="changeVuex">组件修改vuex的变量</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'VuexSub',
  data() {
    return {
      title: 'vuex的组件页',
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
  },
};
</script>
