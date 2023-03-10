import Emitter from 'element-ui/src/mixins/emitter'

export default {
  name: 'CustomBaseSelect',
  model: {
    prop: 'value',
    event: 'change'
  },
  mixins: [Emitter],
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    pageSize: {
      type: Number,
      default: 10
    },
    placeholder: {
      type: String,
      default: '请输入角色名称'
    },
    popperAppendToBody: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      cValue: undefined,
      options: [],
      pending: false,
      pageIndex: 1,
      uuid: 0,
      hasMore: false,
      inputValue: ''
    }
  },
  watch: {
    value(newVal) {
      if (newVal !== this.cValue) {
        this.handleModelChange(newVal)
      }
    }
  },
  computed: {
    loading() {
      return this.pending && this.options.length === 0
    }
  },
  methods: {
    handleChange(value) {
      console.log('change', value)
      this.cValue = value
      this.$emit('change', value)
      this.dispatch('ElFormItem', 'el.form.change', [value])
      this.$emit('handleRowChange', this.options.find((v) => v.value === value))
    },
    remoteMethod(inputValue) {
      console.log('trigger remote method', ...arguments)
      this.pageIndex = 1
      this.options = []
      this.hasMore = true
      this.inputValue = inputValue
      this.request({ inputValue }, this.pageIndex, this.pageSize)
    },
    request(inputValue, pageIndex, pageSize) {
      if (!this.hasMore) {
        return
      }
      this.pending = true
      const uuid = ++this.uuid
      this.fetch(inputValue, { pageIndex, pageSize }).then(res => {
        if (uuid !== this.uuid) {
          return
        }
        let records = res?.data?.records || []
        if (this.formateDataFn) {
          records = this.formateDataFn(res, records)
        }
        this.options.push(...records)
        this.pageIndex = (res?.data?.current ?? pageIndex) + 1

        this.hasMore = records.length >= pageSize
      }).finally(() => {
        this.pending = false
      })
    },
    focus() {
      if (this.pending) {
        return
      }
      // if (this.options && this.options.length) {
      //   return
      // }
      // if (this.cValue) {
      //   return
      // }
      this.remoteMethod('')
    },
    handleLoadMore() {
      console.log('loadmore', this.pending, this.hasMore)
      if (this.pending || !this.hasMore) {
        return
      }
      this.request({ inputValue: this.inputValue }, this.pageIndex, this.pageSize)
    },
    hanldeClear() {
      this.remoteMethod('')
    },
    handleModelChange(newVal) {
      this.cValue = newVal
      if (!this.options.length || this.options.findIndex((v) => { v.value === newVal }) === -1) {
        this.options = []
        this.pageIndex = 1
        this.inputValue = ''
        this.hasMore = true
        this.request({ value: newVal }, this.pageIndex, this.pageSize)
      }
    }
  },
  created() {
    if (this.value) {
      this.handleModelChange(this.value)
    }
  }
}

