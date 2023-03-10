<template>
  <el-select
    v-model="cValue"
    v-loadmore="handleLoadMore"
    remote
    filterable
    :loading="loading"
    :remote-method="remoteMethod"
    :placeholder="placeholder"
    :popper-append-to-body="popperAppendToBody"
    :clearable="clearable"
    :disabled="disabled"
    style="width: 100%"
    @focus="focus"
    @change="handleChange"
    @clear="hanldeClear"
  >
    <slot>
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        :disabled="item.disabled"
      />
    </slot>
  </el-select>
</template>

<script>
import BaseMixin from './base'
import { getProjectManagerList } from '@/api/systemSetting/projectManager'

export default {
  mixins: [BaseMixin],
  props: {
    placeholder: {
      type: String,
      default: '请选择项目经理'
    }
  },
  methods: {
    // 发起请求
    fetch({ inputValue, value }, { pageIndex, pageSize }) {
      let params = {}
      if (value) {
        params = { managerId: value }
      } else {
        params.managerName = inputValue
        params.phone = inputValue
        params.status = 0
      }
      return getProjectManagerList(Object.assign(params, { pageIndex, pageSize }))
    },
    // 格式化内容
    formateDataFn(res, arr) {
      return arr.map((item) => {
        return {
          value: item.managerId,
          label: item.managerName,
          disabled: item.status === 1
        }
      })
    }
  }
}
</script>
