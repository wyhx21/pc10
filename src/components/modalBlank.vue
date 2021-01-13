<template>
  <a-modal
    :visible="visible"
    :width="width"
    :maskClosable="maskClosable"
    :footer="null"
    @update:visible="onClost"
  >
    <div :style="containStyle">
      <slot></slot>
    </div>
  </a-modal>
</template>
<script>
  export default {
    props: {
      width: {
        default: '400px',
      },
      height: {
        default: '400px',
      },
      visible: {
        default: false,
      },
      maskClosable: {
        default: true,
      },
    },
    computed: {
      containStyle() {
        return {
          height: this.height,
          position: 'relative',
          overflow: 'auto',
        }
      },
    },
    methods: {
      onClost() {
        this.$emit('update:visible', false)
      },
    },
  }
</script>
