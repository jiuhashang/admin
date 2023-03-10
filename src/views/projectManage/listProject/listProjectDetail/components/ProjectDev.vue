<template>
  <div>
    <development-project :disabled="true" :is-show="true" />
  </div>
</template>

<script>
import DevelopmentProject from '@/components/DevelopmentProject/DevelopmentProject.vue'
export default {
  components: {
    DevelopmentProject
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped>

</style>
