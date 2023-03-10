<template>
  <section class="app-main">
    <breadcrumb class="breadcrumb-container" />
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="includesNameArr">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
export default {
  name: 'AppMain',
  components: {
    Breadcrumb
  },
  computed: {
    key() {
      return this.$route.path
    },
    includesNameArr() {
      return this.getIncludesNameArr(this.$router.options.routes)
    }
  },
  methods: {
    getIncludesNameArr(rs) {
      const result = []
      loop(rs)
      return result
      function loop(r) {
        let res = false
        r.forEach(item => {
          // 自己 || 子路由中有 keepAlive的属性
          if (item?.meta?.keepAlive || (item.children && loop(item.children))) {
            res = true
            result.push(`${item.name}AliveCache`)
            return
          }
        })
        return res
      }
    }
  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
.fixed-header+.app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
