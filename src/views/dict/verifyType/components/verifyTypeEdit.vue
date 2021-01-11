<template>
  <a-form layout="vertical" :model="currentData" class="app-edit-form_1">
    <a-form-item label="核销类型编码">
      <a-input
        v-model:value="currentData.dicKey"
        placeholder="核销类型编码"
        disabled
      />
    </a-form-item>
    <a-form-item label="核销类型名称">
      <a-input
        v-model:value="currentData.dicValue"
        placeholder="核销类型名称"
      />
    </a-form-item>
    <a-form-item label="排序">
      <a-input-number
        :precision="0"
        v-model:value="currentData.dicSort"
        placeholder="排序"
      />
    </a-form-item>
    <a-form-item label="是否有效">
      <app-switch v-model="currentData.deleted" />
    </a-form-item>
    <a-form-item label="备注信息">
      <a-textarea
        v-model:value="currentData.remark"
        placeholder="备注信息"
        showCount
        :maxlength="50"
        allow-clear
        :rows="3"
      />
    </a-form-item>
  </a-form>
</template>
<script>
  import AppSwitch from '@com/switch'
  import { mapGetters, mapMutations } from 'vuex'
  export default {
    components: {
      AppSwitch,
    },
    computed: {
      ...mapGetters({
        editData: 'appDict/verifyType/currentData',
      }),
    },
    watch: {
      editData: {
        handler(val) {
          this.currentData = { ...val }
        },
        immediate: true,
      },
    },
    data() {
      return {
        currentData: {},
      }
    },
    methods: {
      ...mapMutations({
        setEditData: 'appDict/verifyType/currentData',
      }),
      submit() {
        this.setEditData(this.currentData)
      },
    },
  }
</script>
