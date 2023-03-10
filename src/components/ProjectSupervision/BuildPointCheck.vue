<template>
  <div>
    <div v-if="status === 0" class="t10">
      施工中
    </div>
    <div v-else-if="status === 1">
      <el-button type="danger" @click="handleClickEvent(false)">审核驳回</el-button>
      <el-button type="primary" @click="handleClickEvent(true)">审核通过</el-button>
    </div>
    <div v-else-if="status === 2" class="t10 green">
      审核通过
    </div>
    <div v-else-if="status === 3" class="t10 red">
      审核驳回
    </div>
    <div v-else class="t10">
      施工准备中
    </div>
  </div>
</template>
<script>
import { MessageBox } from 'element-ui'

export default {
  props: {
    status: {
      type: Number,
      default: undefined
    }
  },
  methods: {
    handleClickEvent(pass) {
      MessageBox.confirm(pass ? '是否审核通过？' : '是否审核驳回？', {
        closeOnClickModal: false,
        showClose: false,
        title: '提示'
      }).then(() => {
        this.$emit('check', pass ? 0 : 1)
      }).catch(() => {})
    }
  }
}
</script>
<style lang="scss" scoped>
.t10 {
  margin-right: 10px;
}
.red {
  color: #D9001B;
}

.green {
  color: #70B603;
}
</style>
