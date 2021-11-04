<template>
  <div>
    <div>{{ title }}</div>

    <div>
      {{ plist }}
    </div>
  </div>
</template>
<script>
export default {
  name: 'Map',
  data() {
    return {
      title: 'Map相关知识',
      plist: [],
    }
  },
  methods: {
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
  },
}
</script>
