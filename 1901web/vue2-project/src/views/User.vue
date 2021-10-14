<template>
  <div>
    <div>{{ title }}</div>
  </div>
</template>
<script>
export default {
  name: 'User',
  data() {
    return {
      title: '用户信息演示',
      user: {}
    };
  }
};
</script>
