<template>
  <div>
    <div>{{ title }}</div>

    <a href="http://127.0.0.1:5500/public/flash.html"> 跨站跳跃页面 </a>
    |
    <a href="javascript:void(0)" @click="toFlash">带参数的跨站跳转</a>
    |
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
    <div>
      {{ page }}
    </div>
    <!-- <div>
      {{ list }}
    </div> -->
    <div @click="refresh" style="padding: 1rem; color: #ff00ff">
      刷新</div>
    <div style="padding: 1rem; color: #ff0000" 
    v-if="page.pageCount && page.pageNumber < page.pageCount" 
    @click="getMore">加载更多</div>
    <div v-else>我是有底线的</div>
  </div>
</template>
<script>
import tools from '../../js/tools'
import qs from 'qs'
const def_size = 10
export default {
  name: 'Message',
  data() {
    return {
      title: '最简单的vue瀑布流循环',
      page: { pageSize: def_size },
      tbUserMessage: {},
      list: [],
      count: 4,
      isRefresh: false,
    }
  },
  methods: {
    refresh() {
      this.list = []
      this.page.pageSize = 
        this.page.pageNumber * def_size
      this.page.pageNumber = 1
      this.isRefresh = true
      this.query()
    },
    getMore() {
      this.page.pageNumber++
      this.query()
    },
    toFlash() {
      let flash = 'http://127.0.0.1:5500/public/flash.html?'
      let params = {
        title: '跳转的title',
        info: '跳转的加载信息。。。',
        targetUrl: 'http://127.0.0.1:8080/message/flash',
      }
      let url = flash + qs.stringify(params, { allowDots: true })
      location = url
    },
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
             // 加载更多其实就是追加到数组，而不是替换数据
            this.list = this.list.concat(data.resultData.list)
            if (this.isRefresh) {
              this.page.pageSize = def_size
              this.isRefresh = false
              this.page.pageNumber = 
                parseInt(this.list.length / def_size)
              this.page.pageNumber = 
                this.list.length % def_size == 0 
                ? this.page.pageNumber 
                : this.page.pageNumber + 1
            }
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
