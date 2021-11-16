<template>
  <div>
    <div>{{ title }}</div>
    <hr />
    <input type="text" v-model="num" />
    <button @click="jisuan">阶乘</button>
    {{ result1 }} ----- {{ result2 }}
    <hr />
    <div>
      {{ plist }}
    </div>
  </div>
</template>
<script>
// n的阶乘就是n*(n-1)...*1
function jiecheng(n) {
  let result = 1
  for (let i = 1; i <= n; i++) {
    result = result * i
  }
  return result
}
// 递归的要素，1：调用方法自身，2：递归必须要有终止的条件
function dgjc(n) {
  // 1的阶乘就是1
  if (n == 1) {
    return 1
  }
  // n的阶乘就是n*(n-1)阶乘
  return n * dgjc(n - 1)
}

export default {
  name: 'Map',
  data() {
    return {
      title: 'Map相关知识',
      plist: [],
      num: 1,
      result1: 1,
      result2: 1,
    }
  },
  methods: {
    jisuan() {
      this.result1 = jiecheng(this.num)
      this.result2 = dgjc(this.num)
    },
    query(pid) {
      this.$ajax(
        '/linkinfo/queryAreaByPid',
        {
          'tbAreaInfo.pid': pid,
        },
        function (data) {
          this.plist = data.resultData.list
          // let rmap = []
          // for (let i = 0; i < this.plist.length; i++) {
          //   let info = this.plist[i]
          //   rmap.push(info.name)
          // }
          // 数组的map操作（流式api）可以简单的理解为映射
          let rmap = this.plist.map((info) => {
            console.log('map操作：', info)
            // 原始数据的修改
            delete info.aiid
            delete info.pid
            delete info.label
            delete info.sort
            delete info.level
            info.disable = false
            // 映射过程
            return { id: info.aid, text: info.name }
          })
          console.log('map操作的返回值：', rmap)
        }
      )
    },
  },
  created() {
    this.query(0)
    // map数据结构（练习set）
    // List,Map,Set（输入一串字符串，统计出现了多少个字符，且出现的次数）
    // a111bcc a,1 1,3 b,1 c,2
    let mapInfo = new Map()
    // map的特征就是键值对
    mapInfo.set('one', '一，数字一')
    mapInfo.set('love', '爱')
    mapInfo.set('michael', '天使名，米迦勒')

    console.log('map数据：', mapInfo)
    // 取数据是通过key获取对应的值
    console.log('one的翻译', mapInfo.get('one'))
    // map添加相同的key是覆盖动作，也就是说key是无重复的
  },
}
</script>
