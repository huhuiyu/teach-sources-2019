<template>
  <div>
    <div>{{ title }}</div>
    <div>
      <input type="text" v-model="md5" />
      md5:{{ md5info }}
    </div>
    <div>
      <vuex-user></vuex-user>
      <!-- 登出功能需要清除vuex中的用户 -->
    </div>
  </div>
</template>
<script>
import VuexUser from '../components/VuexUser.vue'
export default {
  components: { VuexUser },
  name: 'Test',
  data() {
    return {
      title: '测试页',
      md5: '',
    }
  },
  computed: {
    md5info() {
      return this.$md5(this.md5)
    },
  },
}
</script>
