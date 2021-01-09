<template>
  <div class="app-con">
    <div class="app-con-param">
      <slot name="param"></slot>
    </div>
    <div class="app-con-qurey">
      <slot name="query"></slot>
    </div>
    <div class="app-con-main">
      <slot></slot>
    </div>
    <div class="app-con-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="scss">
  @import '@style/container.scss';
</style>