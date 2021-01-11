<template>
  <a-popconfirm
    :title="saveTitle"
    ok-text="确认"
    cancel-text="取消"
    @confirm="onConfirm"
  >
    <a-button type="primary" size="small" :loading="loading">
      {{ saveButton }}
    </a-button>
  </a-popconfirm>
  <a-popconfirm
    :title="cancelTitle"
    ok-text="确认"
    cancel-text="取消"
    @confirm="onCancel"
  >
    <a-button size="small">{{ cancelButton }}</a-button>
  </a-popconfirm>
</template>
<script>
  export default {
    props: {
      loading: {
        default: false,
      },
      saveButton: {
        default: '保存',
      },
      cancelButton: {
        default: '取消',
      },
      saveTitle: {
        default: '确认保存？',
      },
      cancelTitle: {
        default: '确认取消？',
      },
    },
    methods: {
      onConfirm() {
        this.$emit('confirm')
      },
      onCancel() {
        this.$emit('cancel')
      },
    },
  }
</script>
