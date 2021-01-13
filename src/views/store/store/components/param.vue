<template>
  <a-form layout="inline" :model="params" class="app-param-form_1">
    <a-form-item label="仓库编码">
      <a-input v-model:value="params.storeCode" placeholder="仓库编码" />
    </a-form-item>
    <a-form-item label="仓库名称">
      <a-input v-model:value="params.storeName" placeholder="仓库名称" />
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
          storeCode: '',
          storeName: '',
          deleted: '',
        },
      }
    },
    methods: {
      ...mapMutations({
        queryParam: 'appStore/store/queryParam',
      }),
      submit() {
        this.queryParam(this.params)
      },
      clean() {
        this.queryParam()
        this.params = {
          storeCode: '',
          storeName: '',
          deleted: '',
        }
      },
    },
  }
</script>
