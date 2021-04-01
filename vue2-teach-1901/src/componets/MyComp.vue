<template>
  <div>
    <div> {{ title }}</div>
    <div>
      组件的信息：
      <input type="text" v-model="info" />
      <button @click="callinfo">事件通知父组件</button>
      {{ info }}
    </div>
    <div>
      <!-- 属性的使用看起来和data一样 -->
      组件的属性：
      {{ user }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyComp',
  data() {
    return {
      title: '黑暗骑士的组件',
      info: ''
    };
  },
  // 组件的属性定义
  props: {
    user: {
      default() {
        return {};
      }
    }
  },
  methods: {
    callinfo() {
      // $emit('自定义事件名称'[,事件的参数值])
      // 事件的参数值会在接收事件的处理函数中收到（需要定义）
      // 下面的代码表示触发show-info这个自定义事件
      // 并且传递当前页面的info值
      this.$emit('show-info', this.info);
    }
  }
};
</script>
