<template>
  <div>
    <div>{{ title }}</div>
    <div>
      动态路由切换：
      <a href="/#/test/myothercomp/DnyA">dnya</a>
      |
      <a href="/#/test/myothercomp/DnyB">dnyb</a>
    </div>
    <div>
      <input type="text" v-model="watchData" />
      {{ watchData }}
      <hr />
      {{ comp }}
    </div>
    <div>
      <!-- 
        动态组件语法component表示动态引入组件
        引入的组件类型由:is注入，is里面的值决定组件的类型
      -->
      <component :is="comp"></component>
      <!-- <dny-a v-if="comp == 'DnyA'"></dny-a>
      <dny-b v-if="comp == 'DnyB'"></dny-b> -->
    </div>
  </div>
</template>
<script>
import DnyA from '../../componets/DnyA';
import DnyB from '../../componets/DnyB';
export default {
  components: { DnyA, DnyB },
  name: 'MyOtherComp',
  data() {
    return {
      title: '组件和监听',
      watchData: '',
      // 要动态切换的组件名称，默认是DnyA
      comp: 'DnyA'
    };
  },
  //监听表达式（慎用！！！）
  watch: {
    // 监听路由信息变化，
    // 两个参数分别是this.$route变化后和变化前
    $route(to, from) {
      console.log('监听$route对象的结果', this.$route.params, to, from);
      // 获取动态路由变化的部分
      // this.$route.params获取完整的动态路由部分
      // this.$route.params.path表示获取动态路由:path对于的信息
      console.log('路由的path信息：', this.$route.params.path);
      this.comp = this.$route.params.path;
    }
  },
  created() {
    console.log('默认路由的path信息：', this.$route.params.path);
    this.comp = this.$route.params.path;
  }
};
</script>
