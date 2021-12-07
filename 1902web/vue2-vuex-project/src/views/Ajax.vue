<template>
  <div>
    <div>{{ title }}</div>
    <div>{{ list }}</div>
    <a href="/message">message</a>
  </div>
</template>
<script>
export default {
  name: 'Ajax',
  data() {
    return {
      title: 'ajax请求数据',
      page: {
        pageNumber: 1,
        pageSize: 5,
      },
      tbUserMessage: {
        info: '',
        title: '',
      },
      list: [],
    }
  },
  methods: {
    query() {
      this.$ajax(
        '/userMessage/queryAll',
        {
          page: this.page,
          tbUserMessage: this.tbUserMessage,
        },
        function (data) {
          this.list = data.resultData.list
        }
      )
    },
  },
  created() {
    this.query()
  },
}
</script>
