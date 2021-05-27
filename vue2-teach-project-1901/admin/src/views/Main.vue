<template>
  <div>
    <div>{{ title }}</div>
    <div>
      <span v-for="m in menus" :key="m.path"
        @click="toPage(m.path)">
        {{ m.text }}
      </span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Main',
  data() {
    return {
      title: '用户首页',
      menus: [
        {
          path: '/manage/one',
          text: '管理页面一'
        },
        {
          path: '/manage/two',
          text: '管理页面二'
        }
      ]
    };
  },
  methods: {
    toPage(path) {
      this.$router.push(path);
    }
  }
};
</script>
