<template>
  <div>
    <div>{{ title }}</div>
    <div>
      <a href="/message/q01">q01</a>
    </div>
    <div>
      {{ visible }}
      <label> <input type="checkbox" v-model="visible" />显示 </label>
    </div>
    <div> 动画效果 </div>

    <div class="action-sheet">
      <!-- 热点区域 -->
      <div @mousedown="down"></div>
      <div>放大区域</div>
    </div>
  </div>
</template>
<script>
import huhuiyu from '../../js/myout'
import hu from '../../js/other'
let actionSheet
let x, y
let inmove = false
export default {
  name: 'MessageQ02',
  data() {
    return {
      title: '动画事件演示',
      visible: true,
    }
  },
  created() {
    console.log(huhuiyu.name, hu.name)
  },
  mounted() {
    actionSheet = document.querySelector('.action-sheet')
    document.body.addEventListener('mousemove', function (event) {
      if (inmove) {
        let newx = event.clientX
        let newy = event.clientY

        console.log('移动中', newx, newy, actionSheet.offsetHeight)

        actionSheet.style.height = actionSheet.offsetHeight - y + event.clientY + 'px'
      }
    })
    document.body.addEventListener('mouseup', function () {
      inmove = false
    })
  },
  methods: {
    down(event) {
      x = event.clientX
      y = event.clientY - actionSheet.offsetHeight
      inmove = true
      console.log('起点：', x, y)
    },
  },
}
</script>

<style scoped>
.action-sheet {
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  width: 100vw;
  height: 30vh;
  bottom: 0;
  left: 0;
  color: #fff;
}
.action-sheet > div:first-of-type {
  width: 100%;
  height: 5px;
}

.action-sheet > div:first-of-type:hover {
  cursor: pointer;
}
</style>
