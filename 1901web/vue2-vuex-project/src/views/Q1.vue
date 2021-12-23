<template>
  <div>
    <div>{{ title }}</div>
    <div>
      <a href="/Q2">生命周期</a>
    </div>
    <div>{{ selected }}</div>
    <div class="menu2">
      <div v-for="m in menus" :key="m.key">
        <span :data-vue-info="m.key + '：'">{{ m.title }}</span>
      </div>
    </div>
    <hr />

    <div class="menu">
      <div v-for="m in menus" :key="m.key" @click="changeMenu(m)" :class="{ active: selected == m.key }">
        {{ m.title }}
      </div>
    </div>
    <hr />
    <!-- 分区视图 -->
    <div v-if="selected == 'key01'"> 衣服的视图 </div>
    <div v-if="selected == 'key02'"> 纸品的视图 </div>
    <div v-if="selected == 'key03'"> 塑料的视图 </div>
    <!-- 伪元素的妙用！！！！ -->
    <div class="after">
      <div>abc</div>
    </div>

    <div class="focus">
      <div>提示一</div>
      <div>
        <input placeholder="点击看看" />
      </div>
      <div>提示二</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Q1',
  data() {
    return {
      title: '页签切换效果',
      menus: [
        { key: 'key01', title: '衣服' },
        { key: 'key02', title: '纸品' },
        { key: 'key03', title: '塑料' },
      ],
      selected: 'key01',
    }
  },
  methods: {
    changeMenu(menu) {
      this.selected = menu.key
    },
  },
}
</script>
<style scoped>
.active {
  color: #ff0000;
}
.menu {
  display: flex;
}
.menu > div {
  margin: 1rem;
  border: 1px solid #dcdcdc;
  padding: 1rem;
}
.menu > div.active {
  border-color: #ff0000;
}

/* ::after/before伪元素，分别表示元素前后的位置 */
.menu2 span::before {
  /* content:伪元素的内容 ; attr可以获取指定属性的值 */
  content: attr(data-vue-info);
}

.menu2 span::after {
  content: '。';
}

.after {
  position: relative;
  width: 100px;
  height: 100px;
  border: 1px solid #ff0000;
  overflow: hidden;
  box-sizing: border-box;
}

.after > div:first-of-type {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.after > div:first-of-type::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  background-color: rgba(0, 0, 0, 0.6);
  transform: translate(100%, 100%);
  transition: transform 1s;
}

.after:hover > div:first-of-type::after {
  transform: translate(0%, 0%);
}

.focus {
  overflow: hidden;
  position: relative;
  width: 200px;
}

.focus > div:first-of-type {
  transform: translateX(-100%);
  transition: transform 1s;
}

.focus > div:last-of-type {
  transform: translateX(-200%);
  transition: transform 2s;
}

.focus:focus-within > div:first-of-type {
  transform: translateX(0%);
}
.focus:focus-within > div:last-of-type {
  transform: translateX(0%);
}
</style>
