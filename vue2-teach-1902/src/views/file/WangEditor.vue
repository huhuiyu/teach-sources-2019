<template>
  <div>
    <div>{{ title }}</div>
    <div class="file-wang-editor-container">
      <div></div>
    </div>
    <hr />
    <textarea v-model="editorData" cols="80" rows="5" readonly></textarea>
  </div>
</template>
<script>
let app;
import wangEditor from 'wangeditor';
export default {
  name: 'WangEditor',
  data() {
    return {
      title: 'WangEditor基本使用',
      editor: null,
      editorData: ''
    };
  },
  created() {
    app = this;
  },
  mounted() {
    const editor = new wangEditor(document.querySelector('.file-wang-editor-container > div'));
    editor.config.onchange = function(data) {
      app.editorData = data;
    };
    editor.config.excludeMenus = ['video', 'table'];
    editor.create();
    app.editor = editor;
  },
  beforeDestroy() {
    // 重量级的对象都有销毁的动作
    if (app.editor) {
      app.editor.destroy();
      app.editor = null;
    }
  }
};
</script>
<style scoped>
.file-wang-editor-container {
  padding: 1rem;
}
</style>
