<template>
  <div>
    <el-pagination @current-change="changePage" @size-change="changeSize" :page-sizes="sizes" :layout="layout" :total="page.total" :page-size.sync="page.pageSize" :page-count="page.pageCount" :current-page.sync="page.pageNumber"></el-pagination>
  </div>
</template>
<script>
export default {
  name: 'Page',
  data() {
    return {};
  },
  props: {
    page: {
      default() {
        return {};
      }
    },
    layout: {
      default() {
        return 'total,prev,pager,next,sizes';
      }
    },
    sizes: {
      default() {
        return [2, 5, 10, 20];
      }
    }
  },
  methods: {
    changeSize(ps) {
      console.log(ps, this.page);
      this.$emit('page-change', this.page);
    },
    changePage(pn) {
      console.log(pn, this.page);
      this.$emit('page-change', this.page);
    }
  }
};
</script>
