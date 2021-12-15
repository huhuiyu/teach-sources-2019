<template>
  <div>
    <div>{{ title }}</div>
    <div>
      <a-button type="primary" shape="round">
        按钮
      </a-button>
    </div>
  </div>
</template>
<script>

export default {
  name: 'AntdHome',
  data() {
    return {
      title: 'Antd首页',
    }
  },
}
</script>
