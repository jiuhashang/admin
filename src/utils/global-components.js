import CustomTable from '@/components/GlobalComponents/CustomTable'
import CustomPagination from '@/components/GlobalComponents/CustomPagination'
import ImageUpload from '@/components/GlobalComponents/ImageUpload'
import FileUpload from '@/components/GlobalComponents/FileUpload'
import ImageUploadString from '@/components/GlobalComponents/ImageUpload/string.vue'
import FileUploadString from '@/components/GlobalComponents/FileUpload/string.vue'
import CustomTabs from '@/components/GlobalComponents/Tabs/Tabs.vue'
import CustomInputNumber from '@/components/GlobalComponents/Input/Input.vue'

function plugin(Vue) {
  if (plugin.installed) {
    return
  }
  Vue.component('cTable', CustomTable)
  Vue.component('cPagination', CustomPagination)
  Vue.component('ImageUpload', ImageUpload)
  Vue.component('FileUpload', FileUpload)
  Vue.component('ImageUploadString', ImageUploadString)
  Vue.component('FileUploadString', FileUploadString)
  Vue.component('cTabs', CustomTabs)
  Vue.component('CInputNumber', CustomInputNumber)
}

export default plugin
