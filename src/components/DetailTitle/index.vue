<template>
  <div class="detail-title">
    <div class="left" @click="backClick">&lt; {{ $route.meta.title }}</div>
    <div class="right">
      <slot name="btn" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    backClick() {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-title {
  display: flex;
  justify-content: space-between;
  padding: 20px 20px 10px;
  box-shadow: 0 1px 1px rgba(0,0,0,.1);
  .left {
    cursor: pointer;
    font-size: 20px;
    font-weight: 600;
  }
}
</style>
