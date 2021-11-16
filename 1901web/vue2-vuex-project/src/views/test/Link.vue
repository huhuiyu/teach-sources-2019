<template>
  <div>
    <div>{{ title }}</div>
    <div>
      <input type="text" v-model="numu" />
      <button @click="jsJiecheng">计算阶乘</button>
      {{ numu }}-----{{ result1 }}------{{ result2 }}
    </div>
    <hr />
    <div>
      <h1>递归完成未知级数的联动</h1>
      <!-- <div>
        {{ list }}
      </div> -->
      <div>
        {{ aids }}
        <span v-for="(datas, index) in list" :key="index">
          <!-- {{ index }} -->
          <select v-if="index <= maxLevel" v-model="aids[index]" @change="queryAreaByPid(aids[index], index + 2)">
            <option v-for="d in datas" :key="d.aiid" :value="d.aid">
              {{ d.name }}
            </option>
          </select>
        </span>
      </div>
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
      // 问题一，数组的数量不确定，所以是数组的数组
      // 意思就是，如果联动是2级，那么这个list中有两个数组
      // 分别对应一级和二级数据
      list: [],
      // 选中的值也是数组
      aids: [null, null, null, null],
      // 最大等级数
      maxLevel: 0,
    }
  },
  methods: {
    jsJiecheng() {
      this.result1 = jiecheng(this.numu)
      this.result2 = dgJc(this.numu)
    },
    // 查询区域的递归方法，参数一是选择的地区编号
    // 参数二是选中的地区编号是第几级的
    queryAreaByPid(pid, level) {
      console.log('递归查询区域的参数', pid, level)
      let app = this
      app.$ajax(
        '/linkinfo/queryAreaByPid',
        {
          'tbAreaInfo.pid': pid,
        },
        function (data) {
          let list = data.resultData.list
          console.log('等级', level, '的数据', list)
          // 递归停止条件，没有下一级数据就表示完成
          if (!list || list.length == 0) {
            // 确定最大等级
            app.maxLevel = level - 2
            console.log('停止的等级：', level, app.list)
            // vue无法监听到数组数据变化，所以需要set方法告诉vue数据变化
            for (let i = 0; i < app.list.length; i++) {
              // 参数一，是通知数据变化的数组对象
              // 参数二，数组中第几个数据变化
              // 参数三，新值
              app.$set(app.list, i, app.list[i])
            }
          } else {
            // 添加等级数据到对应的数组位置
            app.list[level - 1] = list
            // 设置默认值
            app.aids[level - 1] = list[0].aid
            // 继续查询下一级（递归），默认都是查询第一个
            app.queryAreaByPid(list[0].aid, level + 1)
          }
        }
      )
    },
  },
  created() {
    // 启动一级的调用
    this.queryAreaByPid(0, 1)
  },
}
</script>
