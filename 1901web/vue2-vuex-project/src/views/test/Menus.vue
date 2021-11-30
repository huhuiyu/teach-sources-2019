<template>
  <div>
    <div>{{ title }}</div>
    <div class="menus">
      <a :class="{ active: m.text == current.text }" v-for="(m, index) in menus" :key="m.text" @click="changeMenu(m)" href="javascript:void(0)"> {{ index }}---{{ m.text }} </a>
    </div>
    <div>
      {{ info }}
    </div>
    <div>
      {{ current }}
    </div>
    <hr />
    <button @click="showEmpSelector = true">选择员工</button>
    {{ empInfo }}
    <hr />
    <div class="div-emp" v-if="showEmpSelector">
      <div>
        <emp-selector @selected="selectedEmp"></emp-selector>
      </div>
    </div>
  </div>
</template>
<script>
import EmpSelector from '../../components/EmpSelector'
export default {
  components: { EmpSelector },
  name: 'TestMenus',
  data() {
    return {
      showEmpSelector: false,
      empInfo: {},
      empInfos: [],
      title: '菜单效果演示',
      menus: [
        { text: '菜单一', title: '一个菜单啊' },
        { text: '菜单二', title: '另一个菜单啊' },
        { text: '黑暗骑士', title: 'DarkKnight，batman' },
      ],
      info: '',
      current: {},
    }
  },
  methods: {
    changeMenu(menu) {
      this.current = menu
      this.info = menu.title
    },
    selectedEmp(emp) {
      console.log('员工选择完成：', emp)
      this.showEmpSelector = false
      this.empInfo = emp
    },
  },
  created() {
    this.changeMenu(this.menus[0])
  },
}
</script>

<style scoped>
.menus a {
  display: inline-block;
  text-decoration: none;
  margin: 1rem;
  padding: 0.5rem 1rem;
  border: 1px solid #dc00dc;
  border-radius: 0.5rem;
}
.menus a:hover {
  color: #ff0000;
}
.menus a.active {
  border-color: transparent;
  color: #ff0000;
}

.div-emp {
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 10;
  top: 0px;
  left: 0px;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
}

.div-emp > div {
  background-color: #fff;
  border-radius: 0.2rem;
  padding: 0.2rem;
}
</style>
