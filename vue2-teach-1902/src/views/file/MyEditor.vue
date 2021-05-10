<template>
  <div>
    <div>{{ title }}</div>
    <div>
      <my-editor @data-change="editorChange"></my-editor>
    </div>
    <div v-html="editorData"></div>
  </div>
</template>
<script>
import MyEditor from '../../components/MyEditor';
export default {
  name: 'FileMyEditor',
  components: { MyEditor },
  data() {
    return {
      title: '组件版本富文本编辑器',
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
