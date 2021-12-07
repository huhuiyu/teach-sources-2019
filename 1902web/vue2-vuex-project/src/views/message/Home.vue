<template>
  <div>
    <div>{{ title }}</div>
    
    <a href="http://127.0.0.1:5500/public/flash.html"> 
      跨站跳跃页面 
    </a>

    <a href="/ajax">ajax</a>
    <div class="main">
      <!-- 通过数字控制列 -->
      <!-- 
        列和数据索引的关系
        count 4
        i 1 2 3 4
    index 0 1 2 3
          4 5 6 7
          8 9 10 11 
        index%count + 1 = i  

      count 3
        i 1 2 3
    index 0 1 2
          3 4 5
          6 7 8
        index%count + 1 = i    
      -->
      <div v-for="i in count" :key="i">
        <div>
          <div v-for="(d, index) in list" :key="d.umid">
            <div v-if="(index % count) + 1 == i" @click="toDetail(d.umid)">
              {{ d.title }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <div>
      {{ list }}
    </div> -->
  </div>
</template>
<script>
import tools from '../../js/tools'

export default {
  name: 'Message',
  data() {
    return {
      title: '最简单的vue瀑布流循环',
      page: {},
      tbUserMessage: {},
      list: [],
      count: 4,
    }
  },
  methods: {
    toDetail(umid) {
      tools.setLocalUmid(umid)
      this.$router.push({
        path: '/message/detail/' + umid,
        query: {
          umid: umid,
        },
      })
    },
    resize(w, h) {
      console.log('屏幕大小变化：', w, h)
    },
    query() {
      this.$ajax(
        '/userMessage/queryAll',
        {
          page: this.page,
          tbUserMessage: this.tbUserMessage,
        },
        function (data) {
          if (data.success) {
            this.page = data.resultData.page
            this.list = data.resultData.list
            return
          }
          alert(data.message)
        }
      )
    },
  },
  created() {
    this.query()
  },
  mounted() {
    tools.resize(this.resize)
  },
}
</script>
<style scoped>
.main {
  display: flex;
}
.main > div {
  flex: 1;
}

.main > div > div > div > div {
  padding: 1rem;
}
</style>
