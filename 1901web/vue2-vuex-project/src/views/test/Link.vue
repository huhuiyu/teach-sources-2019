<template>
  <div>
    <div>{{ title }}</div>
    <div>
      <input type="text" v-model="numu" />
      <button @click="jsJiecheng">计算阶乘</button>
      {{ numu }}-----{{ result1 }}------{{ result2 }}
    </div>
  </div>
</template>
<script>
// 计算n的阶乘，比如5的阶乘就是5*4*3*2*1
function jiecheng(n) {
  let result = 1
  for (let i = 2; i <= n; i++) {
    result = result * i
  }
  return result
}

function dgJc(n) {
  // 递归要素1，终止条件
  // 1的阶乘就是1，这就是终止条件！！！！
  if (n == 1) {
    return 1
  }
  // 递归要素2，调用自己
  // 5*4*3*2*1
  // 5*4的阶乘
  // 4*3的阶乘...
  return n * dgJc(n - 1)
}

export default {
  name: 'TestLink',
  data() {
    return {
      title: '递归和无限级联动',
      numu: 1,
      result1: 1,
      result2: 1,
    }
  },
  methods: {
    jsJiecheng() {
      this.result1 = jiecheng(this.numu)
      this.result2 = dgJc(this.numu)
    },
  },
}
</script>
