<template>
  <div class="app-table_pagination">
    <a-pagination
      show-size-changer
      :size="size"
      :page-size-options="pageSizeOptions"
      :total="total"
      :show-total="(total) => `共 ${total} 条`"
      @showSizeChange="onPageChange"
      @change="onPageChange"
    >
      <template #buildOptionText="props">
        <span>{{ props.value }}</span>
      </template>
    </a-pagination>
  </div>
</template>
<script>
  export default {
    props: {
      pageSizeOptions: {
        default: [10, 20, 50],
      },
      total: {
        default: 10,
      },
      size: {
        default: 'small',
      },
    },
    data() {},
    methods: {
      onPageChange(page, size) {
        this.$emit('change', page, size)
      },
    },
  }
</script>
