<template>
  <div>
    <div>{{ title }}</div>
    <div>
      <input type="text" v-model="info" placeholder="请输入文件描述信息" />
      <el-button @click="openFile">选择文件</el-button>
      <el-button @click="upload">上传文件</el-button>
      <span v-if="file">{{ file.name }}</span>
      <img v-if="isImage" style="width:15rem;" :src="imgData" alt="" />
    </div>
  </div>
</template>
<script>
import tools from '../../js/tools';
import server from '../../js/server';

export default {
  name: 'TestFile',
  data() {
    return {
      title: '测试文件上传',
      // 选中的文件
      file: null,
      // 图片数据
      imgData: '',
      // 文件描述信息
      info: ''
    };
  },
  computed: {
    isImage() {
      return this.file && tools.isImage(this.file);
    }
  },
  methods: {
    upload() {
      let app = this;
      server.sendFile(
        '/file/upload',
        this.file,
        {
          'tbFile.fileinfo': this.info
        },
        function(data) {
          console.log(data);
          app.$message(data.message);
        }
      );
    },
    openFile() {
      let app = this;
      tools.openFile(function(file) {
        app.file = file;
        // 如果是图片就预览
        if (file && tools.isImage(app.file)) {
          tools.readImage(file, function(data) {
            app.imgData = data;
          });
        }
      });
    }
  }
};
</script>
