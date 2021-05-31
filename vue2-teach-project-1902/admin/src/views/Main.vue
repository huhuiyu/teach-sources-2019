<template>
  <div>
    <div class="user-box">
      <div> <i class="iconfont">&#xe657;</i> {{ title }}</div>
      <div>
        <!-- v-if="mode != ''" -->
        <el-button :disabled="mode == ''" @click="mode = ''">返回菜单</el-button>
        <el-dropdown>
          <el-button type="primary">
            <i class="iconfont">&#xe684;</i>
            {{ userinfo.username }}
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item> 欢迎{{ userinfo.nickname }} </el-dropdown-item>
            <el-dropdown-item divided> <i class="iconfont">&#xe60a;</i>修改密码 </el-dropdown-item>
            <el-dropdown-item>修改信息</el-dropdown-item>
            <el-dropdown-item divided>安全退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <hr />
    <div v-if="mode == ''">
      <div>
        <div v-for="m in menus" :key="m.path">
          <i class="iconfont" v-html="m.icon"></i>
          <span @click="toPage(m)">{{ m.title }}</span>
          -
          <span @click="changePage(m)">跳转:{{ m.title }}</span>
        </div>
      </div>
    </div>
    <!-- 模块切换区域 -->
    <div v-else-if="mode == '/portable'">
      <portable></portable>
    </div>
    <div v-else-if="mode == '/portable/info'">
      <portable-info></portable-info>
    </div>
  </div>
</template>
<script>
import Portable from './portable/Home';
import PortableInfo from './portable/Info';

export default {
  name: 'Main',
  components: { Portable, PortableInfo },
  data() {
    return {
      title: '门户信息管理系统',
      userinfo: {},
      // 模式切换，空字符串表示为菜单列表模式
      // 否则就是对应功能页面
      mode: '',
      menus: [
        {
          title: '门户信息管理',
          icon: '&#xe606;',
          path: '/portable'
        },
        {
          title: '门户基本信息',
          icon: '&#xe63f;',
          path: '/portable/info'
        }
      ]
    };
  },
  methods: {
    changePage(menu) {
      this.$router.push(menu.path);
    },
    toPage(menu) {
      this.mode = menu.path;
    },
    queryUser() {
      this.$ajax('/user/queryUserInfo', {}, function(data) {
        console.log(data);
        if (data.success) {
          this.userinfo = data.resultData.tbUser;
        } else {
          this.$router.push('/');
        }
      });
    }
  },
  created() {
    this.queryUser();
  }
};
</script>

<style scoped>
.user-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 1rem;
}
</style>
