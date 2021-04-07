<template>
  <div>
    <!-- 
      插槽的内容显示是由组件决定，和使用插件的页面没有关系
      命名的插槽会独立出来处理
    -->
    <slot name="top"></slot>
    <div>{{ title }}</div>
    <!-- 
      slot：插槽，将组件里面的内容带到该区域显示
      vue会分析页面，将非命名的插槽以外的内容合并到默认插槽
    -->
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'MyOtherComp',
  data() {
    return {
      title: '演示组件二'
    };
  }
};
</script>
