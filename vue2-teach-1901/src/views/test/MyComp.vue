<template>
  <div>
    <div>{{ title }}</div>
    <h6>=======组件开始=======</h6>
    <!-- 
      页面使用组件，看起来就是扩展了自定义的标记
      效果就是将组件中的vue内容显示在指定区域
    -->
    <!-- 
      组件属性看起来就是html标记的属性，注入值也是vue标准语法
      :组件属性名称="组件的值"
      通过这个语法可以将当前vue对象的值传入到组件中      
    -->
    <!-- 
      组件通过@自定义事件名称="当前事件处理函数"
      来接收组件的自定义事件（也就是$emit发送的）
      自定义事件名称不要和html自带的冲突，比如click
    -->
    <MyComp :user="userinfo" @show-info="showMyCompInfo"></MyComp>
    <h6>=======组件结束=======</h6>
    <el-button @click="compVisible = true">弹出组件</el-button>

    <el-dialog title="组件演示" :visible.sync="compVisible">
      <div>
        <!-- 驼峰表达式组件也可以使用html风格引用 -->
        <my-comp></my-comp>
      </div>
    </el-dialog>

    <hr />
    <div>
      父组件数据：
      <input type="text" v-model="userinfo.name" />
      <input type="text" v-model="userinfo.nickname" />
      {{ userinfo }}
    </div>

    <!-- 组件的附加内容 -->
    <div>
      <h1>定制内容的组件=================</h1>
      <my-other-comp>
        <template slot="bottom">
          <div>
            内容的显示由组件控制
          </div>
        </template>
        <div>黑暗骑士很帅1</div>
        <!-- 
          vue会将所有不在命名slot中的其它内容
          全部添加到默认slot中 
        -->
        <template slot="top">
          <div>出现在name是top的插槽位置</div>
        </template>
        <div>黑暗骑士很帅2</div>
      </my-other-comp>
    </div>
  </div>
</template>

<script>
// 第一步，导入组件
import MyComp from '../../componets/MyComp';
import MyOtherComp from '../../componets/MyOtherComp.vue';

export default {
  name: 'TestMyComp',
  // 第二步，声明组件
  components: { MyComp, MyOtherComp },
  data() {
    return {
      title: '组件测试',
      compVisible: false,
      userinfo: {
        name: '',
        nickname: ''
      }
    };
  },
  methods: {
    showMyCompInfo(info) {
      // 组件自定义事件传递的参数，需要在处理函数里面定义
      this.$message(info);
    }
  }
};
</script>
