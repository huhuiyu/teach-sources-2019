<template>
  <div>
    <!-- 带名称的slot -->
    <slot name="top"></slot>
    <div>{{ title }}</div>
    <!-- 
      slot表示将调用组件的标记里面的内容显示出来
      ，位置由当前组件决定
    -->
    <slot></slot>
    <slot name="bottom"></slot>
  </div>
</template>
<script>
export default {
  name: 'MyOtherComp',
  data() {
    return {
      title: '其它组件'
    };
  }
};
</script>
