<template>
  <div>
    <div>{{ title }}</div>
    <div>
      <a href="/Q1">去Q1</a>
      <label> 切换状态 <input type="checkbox" v-model="visiable" /> </label>

      <div v-if="visiable">哈哈哈哈哈哈</div>
      <div v-else>嘻嘻嘻嘻嘻</div>
      <div>{{ ani }}--{{ disible }}</div>
      <button :disabled="disible" @click="changeAni">切换动画</button>
      <button>切换过渡</button>
      <div id="animate-div" :class="{ ani01: ani == 'ani01', ani02: ani == 'ani02' }"> 动画元素 </div>
    </div>
  </div>
</template>
<script>
let animateDiv
export default {
  name: 'Q2',
  data() {
    return {
      visiable: false,
      title: '生命周期',
      ani: 'ani01',
      disible: false,

      // created和mounted的差别
      // created表示vue对象创建好了，这个里面可以正常使用this来表示当前实例
      // mounted表示页面元素创建好了，也就是要对页面元素做操作要在这个或之后
    }
  },
  methods: {
    changeAni() {
      if (this.disible) {
        return
      }
      this.ani = this.ani == 'ani01' ? 'ani02' : 'ani01'
    },
  },
  beforeCreate() {
    console.log('beforeCreate=====>')
  },
  created() {
    console.log('created=====>')
    console.log('created页面元素：', document.getElementById('animate-div'))
  },
  beforeMount() {
    console.log('beforeMount=====>')
  },
  mounted() {
    console.log('mounted=====>')
    animateDiv = document.getElementById('animate-div')
    console.log('mounted页面元素：', animateDiv)
    let app = this
    animateDiv.addEventListener('animationstart', function () {
      console.log('动画开始')
      app.disible = true
    })
    animateDiv.addEventListener('animationend', function () {
      console.log('动画结束')
      app.disible = false
    })
    // transitionstart，transitionend这个可以监听过渡动画
  },
  beforeUpdate() {
    console.log('beforeUpdate=====>')
  },
  updated() {
    console.log('updated=====>')
  },
  beforeDestroy() {
    console.log('beforeDestroy=====>')
  },
  destroyed() {
    console.log('destroyed=====>')
  },
}
</script>

<style scoped>
.ani01 {
  animation: ani01 2s;
}

.ani02 {
  animation: ani02 2s;
}

@keyframes ani01 {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(720deg);
  }
}

@keyframes ani02 {
  0% {
    transform: translateX(0%);
  }
  50% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0%);
  }
}
</style>
