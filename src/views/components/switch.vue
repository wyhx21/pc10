<template>
  <a-switch
    :checked="checked"
    :disabled="disabled"
    @update:checked="setValue"
    checked-children="有效"
    un-checked-children="无效"
  />
</template>
<script>
  export default {
    props: {
      modelValue: {
        default: 0,
      },
      disabled: {
        default: false,
      },
    },
    watch: {
      modelValue: {
        handler(val) {
          this.checked = val == 1
        },
        immediate: true,
      },
    },
    data() {
      return {
        checked: false,
      }
    },
    methods: {
      setValue(val) {
        const value = val ? 1 : 0
        this.$emit('update:modelValue', value)
      },
    },
  }
</script>
