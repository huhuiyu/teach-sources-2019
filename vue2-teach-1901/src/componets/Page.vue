<template>
  <div>
    <nav>
      <el-pagination 
      @current-change="changePage"
      @size-change="changeSize"
      :layout="layout" :page-sizes="sizes" :total="page.total" :page-count="page.pageCount" :page-size="page.pageSize" :current-page="page.pageNumber"></el-pagination>
    </nav>
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
        return [2, 5, 10, 20, 100];
      }
    }
  },
  methods: {
    changeSize() {
      this.$emit('page-change', this.page);
    },
    changePage() {
      this.$emit('page-change', this.page);
    }
  }
};
</script>
