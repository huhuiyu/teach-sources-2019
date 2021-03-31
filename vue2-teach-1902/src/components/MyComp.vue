<template>
  <div>
    <div>{{ title }}</div>
    <div>
      <input type="text" v-model="info" />
      <el-button @click="callInfo">调用父组件方法</el-button>

      {{ info }}
      <!-- 组件的属性，和data相似 -->
      <br />
      {{ user }}
      <div>属性的使用</div>
      <input type="text" v-model="user.name" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'MyComp',
  data() {
    return {
      title: '我的自定义组件',
      info: ''
    };
  },
  methods: {
    callInfo() {
      // $emit('自定义事件名称'[,传递给事件的参数])
      this.$emit('show-info', this.info);
    }
  },
  // props：是组件的属性定义
  // 属性的使用和data小节的内容一样使用
  // 属性在组件调用时通过标记属性传入值
  // 例如<MyComp 属性名称="输入传入值">
  props: {
    user: {
      // default函数是定义属性的默认值
      default() {
        return {};
      }
    }
  }
};
</script>
