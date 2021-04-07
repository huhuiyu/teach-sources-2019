<template>
  <div>
    <div>{{ title }}</div>
    <div>
      <input type="file" />
    </div>
    <div>
      动态路由切换：
      <a href="/#/test/othercomp/DnyA">dnya</a>
      |
      <a href="/#/test/othercomp/DnyB">dnyb</a>
      path值：
      {{ comp }}
    </div>
    <!-- 
      componen表示动态导入组件,导入组件的类型由:is属性注入
    -->
    <component :is="comp"></component>

    <div v-if="comp == 'DnyA'">
      <dny-a></dny-a>
    </div>
    <div v-if="comp == 'DnyB'">
      <dny-b></dny-b>
    </div>
  </div>
</template>
<script>
import DnyA from '../../components/DnyA';
import DnyB from '../../components/DnyB';

export default {
  components: { DnyA, DnyB },
  name: 'TestMyOtherComp',
  data() {
    return {
      title: '动态路由组件',
      comp: ''
    };
  },
  // 侦听器
  // 监听值是否变化,要监听的变量名称(变化之后的值，之前的值)
  // 监听的对象只能是data中声明的或者是内置对象
  watch: {
    $route(to, from) {
      console.log('路由信息变化', to, from);
      // this.$route.params表示路由信息的动态值
      // path是路由中:后面的名称
      console.log('路由动态信息：', this.$route.params.path);
      this.comp = this.$route.params.path;
    }
  },
  created() {
    // 默认值
    this.comp = this.$route.params.path;
  }
};
</script>
