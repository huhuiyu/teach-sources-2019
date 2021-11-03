<template>
  <div>
    <div>{{ title }}</div>
    <div>
      <!-- {{ plist }} -->
    </div>
    <div>
      {{ mapJson }}
      <hr />
      <van-field v-model="mapKey" placeholder="map键"></van-field>
      <van-field v-model="mapInfo" placeholder="map值"></van-field>
      <van-button @click="addMap">添加</van-button>
      <van-button @click="getMap">获取值</van-button>
      <van-button @click="removeMap">移除</van-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TestMap',
  data() {
    return {
      title: 'map知识点',
      plist: [],
      // Map是键值对数据结构
      // 添加数据的是key，value一对
      // 获取数据是通过key获取对应value
      // 不可能有两个key相同，所以添加相同的key，其实是覆盖value
      // map.set("one","abcddef") //添加
      // map.get("one") 返回"abcddef"
      map: new Map(),
      mapKey: null,
      mapInfo: null,
      mapJson: null,
    }
  },
  methods: {
    // 移除map中的数据
    removeMap() {
      this.map.delete(this.mapKey)
      console.log(this.map)
    },
    // 获取map中的值
    getMap() {
      this.mapJson = this.map.get(this.mapKey)
    },
    // 添加到map
    addMap() {
      this.map.set(this.mapKey, this.mapInfo)
      console.log(this.map)
    },

    queryAreaInfo(pid) {
      this.$ajax(
        '/linkinfo/queryAreaByPid',
        {
          'tbAreaInfo.pid': pid,
        },
        function (data) {
          let list = data.resultData.list
          console.log('原始应答结果', list)
          // map方法，对数组信息进行映射，传入的参数就是单一笔记录
          let mapdata = list.map((info) => {
            console.log('map方法：', info)
            // 映射 mapping
            let rinfo = { id: info.aid, text: info.name }
            // 对原始数据修改 delete是删除json的属性
            delete info.label
            delete info.pid
            delete info.level
            delete info.sort

            return rinfo
          })
          console.log('map的返回值', mapdata)
          console.log('处理后的结果', list)
          this.plist = list
        }
      )
    },
  },
  created() {
    this.queryAreaInfo(0)
  },
}
</script>
