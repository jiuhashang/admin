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
      />
    </slot>
  </el-select>
</template>

<script>
import BaseMixin from './base'
import { getAdminRoleList } from '@/api/systemSetting/projectManager'

export default {
  mixins: [BaseMixin],
  methods: {
    // 发起请求
    fetch({ inputValue, value }, { pageIndex, pageSize }) {
      return getAdminRoleList({ roleName: inputValue, id: value, pageIndex, pageSize })
    },
    // 格式化内容
    formateDataFn(res, arr) {
      return arr.map((item) => {
        return {
          value: item.id,
          label: item.roleName
        }
      })
    }
  }
}
</script>
