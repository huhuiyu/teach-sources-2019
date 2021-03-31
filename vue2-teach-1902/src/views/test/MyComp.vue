<template>
  <div>
    <div>测试组件</div>
    <div>
      <h1>组件开始============</h1>
      <!-- 页面使用组件就和使用标记一样，组件的内容会呈现在标记区域 -->
      <!-- 组件的属性是通过标记的属性注入，:表示动态注入 -->
      <!-- 
        @自定义事件名称="事件处理函数"
        组件通过$emit触发自定义事件
      -->
      <MyComp :user="userinfo" @show-info="showMyCompInfo"></MyComp>
      <h1>组件结束============</h1>
    </div>
    <div>
      <!-- 可以多次使用，且不区分区域 -->
      <el-button @click="compVisible = true">弹出组件</el-button>
      <el-dialog title="组件弹出" :visible.sync="compVisible">
        <div>
          <MyComp :user="userinfo"></MyComp>
        </div>
      </el-dialog>
    </div>
    <div>
      传递值到组件
      <input type="text" v-model="userinfo.name" />
      <input type="text" v-model="userinfo.nickname" />
      {{ userinfo }}
    </div>
  </div>
</template>
<script>
// 导入组件
import MyComp from '../../components/MyComp';
export default {
  name: 'TestMyComp',
  // 引用组件
  components: { MyComp },
  data() {
    return {
      compVisible: false,
      userinfo: {
        name: '',
        nickname: ''
      }
    };
  },
  methods: {
    // 弹出显示info的方法，定义为子组件调用的方法
    showMyCompInfo(info) {
      this.$message(info);
    }
  }
};
</script>
