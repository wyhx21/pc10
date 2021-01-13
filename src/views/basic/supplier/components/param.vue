<template>
  <a-form layout="inline" :model="params" class="app-param-form_1">
    <a-form-item label="供应商编码">
      <a-input v-model:value="params.supplierCode" placeholder="供应商编码" />
    </a-form-item>
    <a-form-item label="供应商名称">
      <a-input v-model:value="params.supplierName" placeholder="供应商名称" />
    </a-form-item>
    <a-form-item label="联系人">
      <a-input v-model:value="params.linkName" placeholder="联系人" />
    </a-form-item>
    <a-form-item label="联系方式">
      <a-input v-model:value="params.mobile" placeholder="联系方式" />
    </a-form-item>
    <a-form-item label="状态">
      <a-select v-model:value="params.deleted" placeholder="请选择状态">
        <a-select-option value="">全部</a-select-option>
        <a-select-option value="1">有效</a-select-option>
        <a-select-option value="0">无效</a-select-option>
      </a-select>
    </a-form-item>
  </a-form>
</template>
<script>
  import { mapMutations } from 'vuex'
  export default {
    data() {
      return {
        params: {
          supplierCode: '',
          supplierName: '',
          deleted: '',
          linkName: '',
          mobile: '',
        },
      }
    },
    methods: {
      ...mapMutations({
        queryParam: 'appBasic/customer/queryParam',
      }),
      submit() {
        this.queryParam(this.params)
      },
      clean() {
        this.queryParam()
        this.params = {
          supplierCode: '',
          supplierName: '',
          deleted: '',
          linkName: '',
          mobile: '',
        }
      },
    },
  }
</script>
