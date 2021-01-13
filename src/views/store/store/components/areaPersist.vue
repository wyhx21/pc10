<template>
  <a-form layout="vertical" :model="currentData" class="app-edit-form_1">
    <a-form-item label="仓库区域编码">
      <a-input
        v-model:value="currentData.areaCode"
        placeholder="仓库区域编码"
      />
    </a-form-item>
    <a-form-item label="仓库区域名称">
      <a-input
        v-model:value="currentData.areaName"
        placeholder="仓库区域名称"
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
  import { mapGetters, mapMutations } from 'vuex'
  import AppSwitch from '@com/switch'
  export default {
    components: {
      AppSwitch,
    },
    computed: {
      ...mapGetters({
        editData: 'appStore/store/currentArea',
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
        setEditData: 'appStore/store/currentArea',
      }),
      submit() {
        this.setEditData(this.currentData)
      },
    },
  }
</script>
