<template>
  <div>
    <div>{{ title }}</div>
    <div>
      <div>{{ tbUserMessage.title }}</div>
      <hr />
      <div v-if="tbUserMessage.user"> {{ tbUserMessage.user.username }}说：{{ tbUserMessage.info }} </div>
      <h4>
        评论列表
        <span @click="refresh">刷新评论</span>
      </h4>
      <div v-for="d in list" :key="d.umrid" style="margin: 1rem">
        <div> {{ d.user.username }}评论说: </div>
        <div>{{ d.info }}</div>
        <div>评论时间：{{ d.lastupdate }}</div>
      </div>
      <div style="text-align: center; padding: 1rem">
        <span v-if="page.pageNumber < page.pageCount" @click="more" style="cursor: pointer">查看更多</span>
        <span v-else>我是有底线的</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Detail',
  data() {
    return {
      title: '帖子详情',
      page: { pageSize: 5, pageNumber: 1 },
      list: [],
      tbUserMessage: {},
      umid: -1,
      // 是否还有更多记录
      hasMore: true,
    }
  },
  methods: {
    refresh() {
      this.page.pageNumber = 1
      this.list = []
      this.query()
    },
    more() {
      this.page.pageNumber++
      this.query()
    },
    query() {
      console.log('帖子的id：', this.umid)
      this.$ajax(
        '/userMessage/queryUserMessageDetail',
        {
          'tbUserMessageReply.umid': this.umid,
          page: this.page,
        },
        function (data) {
          this.list = this.list.concat(data.resultData.list)
          this.page = data.resultData.page
          this.tbUserMessage = data.resultData.tbUserMessage
        }
      )
    },
  },
  created() {
    this.umid = this.$route.params.id
    this.query()
  },
}
</script>
