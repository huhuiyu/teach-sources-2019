<template>
  <div>
    <div>{{ title }}</div>
    <div>
      {{ aids }} <br />
      {{ maxLevel }} <br />
      <!-- {{ list }} -->
    </div>
    <div>
      <!-- 
        思考题，添加一个确定按钮，点击后显示
        选中的城市完整信息,比如，北京-北京市-东城区-东城街道
        选中的最后一级（有效等级）的选中值aid 
      -->
      <span v-for="(datas, index) in list" :key="index">
        <select v-model="aids[index]" @change="query(aids[index], index + 2)" v-if="maxLevel - index >= 2">
          <option v-for="d in datas" :key="d.aid" :value="d.aid">
            {{ d.name }}
          </option>
        </select>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Link',
  data() {
    return {
      title: '递归版本的区域联动',
      // 区域的数组（这里是数组的数组）
      list: [],
      // 最大层级数
      maxLevel: 0,
      // 每一级的选中值列表
      aids: [],
    }
  },
  methods: {
    // 递归的方法定义，参数是地区的编号和查询层级
    // 返回的是该地区的所有子地区
    query(pid, level) {
      this.$ajax(
        '/linkinfo/queryAreaByPid',
        {
          'tbAreaInfo.pid': pid,
        },
        function (data) {
          let list = data.resultData.list
          console.log('等级，区域id，结果：', level, pid, list)
          // 如果数据存在就可以继续递归调用
          if (list && list.length > 0) {
            // 放置等级对应的数据
            this.list[level - 1] = list
            // 设置默认选中项
            this.aids[level - 1] = list[0].aid
            this.query(list[0].aid, level + 1)
          } else {
            // 不存在就确定最大等级
            this.maxLevel = level
            // 修正vue数组数据不能更新的问题
            for (let i = 0; i < this.list.length; i++) {
              //$set方法是强制更新数据
              // 第一个参数是要更新数据的数组
              // 第二个参数是要更新的数组位置索引
              // 第三个参数是新值
              this.$set(this.list, i, this.list[i])
            }
          }
        }
      )
    },
  },
  created() {
    // 第一级别的数据的pid都是0
    this.query(0, 1)
  },
}
</script>
