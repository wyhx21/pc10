<template>
  <div class="app-con" :style="conStyle">
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
    props: {
      stretch: {
        default: false,
      },
    },
    data() {
      return {
        conStyle: {
          height: '10px',
        },
      }
    },
    beforeMount() {
      window.addEventListener('resize', this.setContainSize)
    },
    beforeUnmount() {
      window.removeEventListener('resize', this.setContainSize)
    },
    mounted() {
      this.setContainSize()
    },
    methods: {
      setContainSize() {
        if (this.stretch) {
          this.conStyle.height = '100%'
        } else {
          const contentHeight =
            document.getElementById('app-ant-content').getBoundingClientRect()
              .height - 40
          this.conStyle.height = contentHeight + 'px'
        }
      },
    },
  }
</script>
<style lang="scss">
  @import '@style/container.scss';
</style>
