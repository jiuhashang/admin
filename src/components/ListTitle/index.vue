<template>
  <div>
    <p class="title">{{ $route.meta.title }}</p>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.title {
  font-size: 20px;
  font-weight: bold;
  padding: 0 20px 10px;
  box-shadow: 0 1px 1px rgba(0,0,0,.1);
}
</style>
