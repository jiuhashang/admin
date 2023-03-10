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
import { getBuilderTeamList } from '@/api/unitManage/index'

export default {
  mixins: [BaseMixin],
  props: {
    placeholder: {
      type: String,
      default: '请选择施工方'
    }
  },
  methods: {
    // 发起请求
    fetch({ inputValue, value }, { pageIndex, pageSize }) {
      let params = {}
      if (value) {
        params = { id: value }
      } else {
        params.companyName = inputValue
        params.status = 3
      }

      return getBuilderTeamList(Object.assign(params, { pageIndex, pageSize }))
    },
    // 格式化内容
    formateDataFn(res, arr) {
      return arr.map((item) => {
        return {
          value: item.id,
          label: item.companyName,
          disabled: item.status !== 3
        }
      })
    }
  }
}
</script>
