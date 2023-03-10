<template>
  <!-- <el-card>
    <div>
      <h3>发电预估</h3>
    </div> -->
  <estimate-info-table :use-self="true" />
  <!-- </el-card> -->

</template>

<script>
import EstimateInfoTable from '@/components/BestManage/EstimateInfoTable.vue'
export default {
  components: { EstimateInfoTable },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
</style>
