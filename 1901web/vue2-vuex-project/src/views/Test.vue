<template>
  <div>
    <div>{{ title }}</div>
    <div>{{ userinfo }}</div>
    <vuex-user></vuex-user>
  </div>
</template>
<script>
import VuexUser from '../components/VuexUser.vue'
export default {
  name: 'Test',
  components: { VuexUser },
  data() {
    return {
      title: '测试页',
    }
  },
  computed: {
    userinfo() {
      return this.$store.state.user
    },
  },
}
</script>
