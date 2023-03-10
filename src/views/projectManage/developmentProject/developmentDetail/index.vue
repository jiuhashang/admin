<template>
  <div>
    <detail-title />
    <basic-info />
    <development-project />
  </div>
</template>

<script>
import DetailTitle from '@/components/DetailTitle'
import BasicInfo from '@/components/BasicInfo'
import DevelopmentProject from '@/components/DevelopmentProject/DevelopmentProject'
export default {
  components: {
    DetailTitle,
    BasicInfo,
    DevelopmentProject
  },
  data() {
    return {
      projectId: '',
      createTime: '',
      createUser: ''
      // disabled: true
    }
  },
  created() {
    this.projectId = this.$route.query.projectId
    this.createTime = this.$route.query.createTime
    this.createUser = this.$route.query.createUser
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.el-card {
  margin: 20px;
}
</style>
