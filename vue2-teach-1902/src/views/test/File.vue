<template>
  <div>
    <div>{{ title }}</div>
    <div>
      <input type="text" v-model="info" />
      <el-button @click="openFile">选择文件</el-button>
      <el-button @click="upload">上传文件</el-button>

      <img v-if="isImage" style="width: 10rem;" :src="imgData" alt="" />
      <span v-if="file">{{ file.name }}</span>
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
      title: '文件api测试',
      // 上传的文件对象
      file: null,
      // 图片信息
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
      server.sendFile(
        '/file/upload',
        this.file,
        {
          'tbFile.fileinfo': this.info
        },
        function(data) {
          console.log(data);
        }
      );
    },
    openFile() {
      let app = this;
      tools.openFile(function(file) {
        console.log('打开文件的结果', file);
        app.file = file;
        // 是图片的情况
        if (file && tools.isImage(file)) {
          tools.readImage(file, function(data) {
            app.imgData = data;
          });
        }
      });
    }
  }
};
</script>
