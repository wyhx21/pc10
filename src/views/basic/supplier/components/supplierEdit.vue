<template>
  <a-form layout="horizontal" :model="currentData" class="app-edit-form_2">
    <a-form-item label="供应商编码">
      <a-input
        v-model:value="currentData.supplierCode"
        placeholder="供应商编码"
        disabled
      />
    </a-form-item>
    <a-form-item label="供应商名称">
      <a-input
        v-model:value="currentData.supplierName"
        placeholder="供应商名称"
      />
    </a-form-item>
    <a-form-item label="联系人">
      <a-input v-model:value="currentData.linkName" placeholder="联系人" />
    </a-form-item>
    <a-form-item label="联系方式">
      <a-input v-model:value="currentData.mobile" placeholder="联系方式" />
    </a-form-item>
    <a-form-item label="性别">
      <a-radio-group name="sexRadio" v-model:value="currentData.sex">
        <a-radio :value="0">男</a-radio>
        <a-radio :value="1">女</a-radio>
      </a-radio-group>
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
        editData: 'appBasic/supplier/currentData',
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
        setEditData: 'appBasic/supplier/currentData',
      }),
      submit() {
        this.setEditData(this.currentData)
      },
    },
  }
</script>
