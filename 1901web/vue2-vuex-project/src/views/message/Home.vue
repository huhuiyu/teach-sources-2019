<template>
  <div>
    <div>{{ title }}</div>
    <div>
      <a href="javascript:void(0)" @click="toFlash"> 跨站跳转 </a>
    </div>
    <!-- 
      其实我最开始的设计，查询信息只要显示title，
      点击title跳转页面看详细信息，因为吕佳龙的要求，所以数据看起来很奇怪
    -->
    <div class="message-box">
      <!-- 
      index 1 2 3 4 
      i     0 1 2 3 
      i     4 5 6 7 
      i     8 9 10 11
      i%4+1==index
      -->
      <div v-for="index in cols" :key="index">
        <div v-for="(d, i) in list" :key="d.umid">
          <div v-if="(i % 4) + 1 == index">
            <div>
              <div @click="showDetail(d.umid)"> {{ d.title }} </div>
              <div>
                <span> {{ d.user.username }}:{{ d.lastupdate }} </span>
                <span v-if="d.replyCount > 0"> 回帖数：{{ d.replyCount }} </span>
                <span v-else>我要评论</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!--     
      -->
    </div>

    <!-- <div>
      {{ list }}
      <br />
      {{ page }}
    </div> -->
  </div>
</template>
<script>
import qs from 'qs'

export default {
  name: 'Message',
  data() {
    return {
      title: '留言板首页',
      page: {},
      list: [],
      queryInfo: {},
      // 瀑布式布局的列数
      cols: 4,
    }
  },
  methods: {
    toFlash() {
      let url = 'http://127.0.0.1:5500/public/flash.html'
      // 定制参数
      let json = {
        url: 'http://localhost:8080/message/flash',
        title: '跳转定制标题',
        info: '定制页面内容',
      }
      console.log(url + '?' + qs.stringify(json))
      location = url + '?' + qs.stringify(json)
    },
    showDetail(umid) {
      this.$router.push('/message/detail/' + umid)
    },
    query() {
      this.$ajax(
        '/userMessage/queryAll',
        {
          page: this.page,
          tbUserMessage: this.queryInfo,
        },
        function (data) {
          if (!data.success) {
            console.error(data.message)
            alert('网站开小差去了')
            return
          }
          this.list = data.resultData.list
          this.page = data.resultData.page
        }
      )
    },
  },
  created() {
    this.query()
  },
}
</script>
<style scoped>
.message-box {
  display: flex;
}

.message-box > div {
  width: 25%;
}
.message-box > div > div > div {
  box-sizing: content-box;
  padding: 0.5rem;
}

.message-box > div > div > div > div {
  border: 1px solid #dcdcdc;
  border-radius: 0.2rem;
}

.message-box > div > div > div > div > div {
  padding: 1rem;
}

.message-box > div > div > div > div > div:first-of-type {
  border-bottom: 1px solid #dcdcdc;
  cursor: pointer;
}
</style>
