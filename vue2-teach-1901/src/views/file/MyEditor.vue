<template>
  <div>
    <div>{{ title }}</div>
    <my-editor-comp @data-change="editorChange"></my-editor-comp>
    <div v-html="editorData"></div>
  </div>
</template>
<script>
import MyEditorComp from '../../componets/MyEditor';
export default {
  name: 'MyEditor',
  components: {
    MyEditorComp
  },
  data() {
    return {
      title: '富文本编辑器组件封装',
      editorData: ''
    };
  },
  methods: {
    editorChange(data) {
      this.editorData = data;
    }
  }
};
</script>
