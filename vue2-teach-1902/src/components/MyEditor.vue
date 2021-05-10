<template>
  <div class="my-editor-components-container">
    <div></div>
  </div>
</template>
<script>
let app;
import wangEditor from 'wangeditor';

export default {
  name: 'MyEditor',
  data() {
    return {
      editor: null
    };
  },
  created() {
    app = this;
  },
  beforeDestroy() {
    if (app.editor) {
      app.editor.destroy();
      app.editor = null;
    }
  },
  mounted() {
    const editor = new wangEditor(document.querySelector('.my-editor-components-container > div'));
    editor.config.onchange = function(data) {
      app.$emit('data-change', data);
    };
    // 建议将本方法修改为组件属性传入方式
    editor.config.excludeMenus = ['table', 'video'];
    editor.create();
    app.editor = editor;
  }
};
</script>
<style scoped>
.my-editor-components-container {
  padding: 1.5rem;
}
</style>
