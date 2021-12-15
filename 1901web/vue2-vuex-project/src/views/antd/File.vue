<template>
  <div>
    <div>{{ title }}</div>
    <file-manager></file-manager>
  </div>
</template>
<script>
import FileManager from '../../components/FileManager.vue'

export default {
  components: { FileManager },
  name: 'AntdFile',
  data() {
    return {
      title: '文件组件演示',
    }
  },
}
</script>
