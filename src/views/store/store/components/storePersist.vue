<template>
  <a-form layout="horizontal" :model="currentData" class="app-edit-form_2">
    <a-form-item label="仓库编码">
      <a-input v-model:value="currentData.storeCode" placeholder="仓库编码" />
    </a-form-item>
    <a-form-item label="仓库名称">
      <a-input v-model:value="currentData.storeName" placeholder="仓库名称" />
    </a-form-item>
    <a-form-item label="是否有效">
      <app-switch v-model="currentData.deleted" />
    </a-form-item>
    <a-form-item label="地址">
      <a-textarea
        v-model:value="currentData.address"
        placeholder="地址"
        showCount
        :maxlength="80"
        allow-clear
        :rows="3"
      />
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
        editData: 'appStore/store/currentData',
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
        setEditData: 'appStore/store/currentData',
      }),
      submit() {
        this.setEditData(this.currentData)
      },
    },
  }
</script>
