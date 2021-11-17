<template>
  <div>
    <div>{{ title }}</div>
    <hr />
    <div>
      <div v-for="em in list" :key="em.employeeId">
        <div>
          <input type="checkbox" v-model="em.checked" />
          <!-- <input type="radio" name="emchecked" v-model="em.checked" /> -->
          {{ em.employeeName }}-{{ em.phone }}
          <a
            @click="
              emp = em
              selected()
            "
            >选择</a
          >
        </div>
        <hr />
      </div>
    </div>
    <hr />
    <div>
      <button @click="selectedAll">确认选择</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'EmpSelector',
  data() {
    return {
      title: '员工选择器',
      emp: {},
      list: [],
      page: { pageSize: 5 },
      empChecked: false,
    }
  },
  methods: {
    selectedAll() {
      // 多选功能
      let emps = []
      for (let i = 0; i < this.list.length; i++) {
        let item = this.list[i]
        if (item.checked) {
          emps.push(item)
        }
      }
      this.$emit('selected', emps)
    },
    selected() {
      this.$emit('selected', this.emp)
    },
    query() {
      this.$ajax(
        '/manange/employee/query',
        {
          page: this.page,
        },
        function (data) {
          let list = data.resultData.list
          // 伪造选中状态，方便循环绑定model
          list.map((item) => {
            item.checked = false
          })
          // 循环版本
          // for (let i = 0; i < list.length; i++) {
          //   let item = list[i]
          //   item.checked = false
          // }
          this.list = list
        }
      )
    },
  },
  created() {
    this.query()
  },
}
</script>
