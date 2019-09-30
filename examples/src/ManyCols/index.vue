<template>
  <div>
    <code>query: {{ query }}</code>
    <datatable v-bind="$data" />
  </div>
</template>
<script>
import mockData from '../_mockData'

export default {
  data: () => ({
    columns: [],
    data: [],
    total: 0,
    query: {},
    maxCols:3
  }),
  created(){
    for(let i=1;i<51;i++){
      this.columns.push({ title: `Col-${i}`, field: 'name' })
    }
  },
  watch: {
    query: {
      handler (query) {
        mockData(query).then(({ rows, total }) => {
          this.data = rows
          this.total = total
        })
      },
      deep: true
    }
  }
}
</script>
