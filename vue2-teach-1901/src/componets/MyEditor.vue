<template>
  <div class="my-wang-editor-component">
    <div></div>
  </div>
</template>
<script>
import wangEditor from 'wangeditor';
let app;
// 富文本编辑器组件封装
export default {
  name: 'MyEditorComp',
  data() {
    return {
      editor: null
    };
  },
  mounted() {
    let editor = new wangEditor('.my-wang-editor-component > div');
    editor.config.onchange = function(data) {
      app.$emit('data-change', data);
    };
    // 建议写成属性控制
    editor.config.excludeMenus = ['video'];
    editor.create();
    app.editor = editor;
    // [165,175],['红色','蓝色'],['蝙蝠侠','']
  },
  created() {
    app = this;
  },
  beforeDestroy() {
    if (app.editor) {
      app.editor.destroy();
      app.editor = null;
    }
  }
};
</script>
<style scoped>
.my-wang-editor-component {
  padding: 1.5rem;
}
</style>
