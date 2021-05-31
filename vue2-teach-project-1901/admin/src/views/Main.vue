<template>
  <div>
    <div>{{ title }}</div>
    <!--  跳转菜单 -->
    <div>
      <span v-for="m in menus" :key="m.path" @click="toPage(m.path)">
        {{ m.text }}
      </span>
    </div>
    <hr />
    <!-- 页面内切换菜单 -->
    <div>
      <span v-for="m in menus" :key="m.path" @click="changePage(m.path)">
        {{ m.text }}
      </span>
    </div>
    <hr />
    <div v-if="menu == '/manage/one'">
      <manage-one></manage-one>
    </div>
    <div v-else-if="menu == '/manage/two'">
      <manage-two></manage-two>
    </div>
    <div v-else-if="menu == '/manage/portable'">
      <portable></portable>
    </div>
  </div>
</template>
<script>
import ManageOne from './manage/One';
import ManageTwo from './manage/Two';
import Portable from './manage/Portable';

export default {
  name: 'Main',
  components: { ManageOne, ManageTwo, Portable },
  data() {
    Portable;
    return {
      title: '用户首页',
      menu: '',
      menus: [
        {
          path: '/manage/portable',
          text: '门户信息管理'
        },
        {
          path: '/manage/one',
          text: '管理页面一'
        },
        {
          path: '/manage/two',
          text: '管理页面二'
        }
      ]
    };
  },
  methods: {
    changePage(path) {
      this.menu = path;
    },
    toPage(path) {
      this.$router.push(path);
    }
  }
};
</script>
