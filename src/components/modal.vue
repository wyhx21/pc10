<template>
  <a-modal
    :visible="visible"
    :title="title"
    :width="width"
    :maskClosable="false"
    @update:visible="onCancel"
  >
    <div :style="containStyle">
      <slot></slot>
    </div>

    <template #footer>
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
      title: {
        default: '',
      },
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
    computed: {
      containStyle() {
        return {
          height: this.height,
          overflow: 'auto',
          position: 'relative',
        }
      },
    },
    methods: {
      onConfirm() {
        this.$emit('confirm')
      },
      onCancel() {
        this.$emit('update:visible', false)
      },
    },
  }
</script>
