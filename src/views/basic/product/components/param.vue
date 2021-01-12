<template>
  <a-form layout="inline" :model="params">
    <a-form-item label="商品类型">
      <a-select v-model:value="params.prodType" placeholder="商品类型">
        <a-select-option v-for="item in typeList" :key="item['code']">
          {{ item['value'] }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="商品编码">
      <a-input v-model:value="params.prodCode" placeholder="商品编码" />
    </a-form-item>
    <a-form-item label="商品名称">
      <a-input v-model:value="params.prodName" placeholder="商品名称" />
    </a-form-item>
    <a-form-item label="商品状态">
      <a-select v-model:value="params.deleted" placeholder="请选择状态">
        <a-select-option value="">全部</a-select-option>
        <a-select-option value="1">有效</a-select-option>
        <a-select-option value="0">无效</a-select-option>
      </a-select>
    </a-form-item>
  </a-form>
</template>
<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  export default {
    computed: {
      ...mapGetters({
        typeList: 'appBasic/product/allProdTypeList',
      }),
    },
    data() {
      return {
        params: {
          deleted: '',
          prodCode: '',
          prodName: '',
          prodType: '',
        },
      }
    },
    beforeMount() {
      this.getTypeList()
    },
    methods: {
      ...mapMutations({
        queryParam: 'appBasic/product/queryParam',
      }),
      ...mapActions({
        getTypeList: 'appBasic/product/prodTypeList',
      }),
      submit() {
        this.queryParam(this.params)
      },
      clean() {
        this.queryParam()
        this.params = {
          deleted: '',
          prodCode: '',
          prodName: '',
          prodType: '',
        }
      },
    },
  }
</script>
