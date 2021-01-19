<template>
  <a-form layout="inline" :model="params" class="app-param-form_1">
    <a-form-item label="核销类型">
      <a-select v-model:value="params.verifiCode" placeholder="核销类型">
        <a-select-option v-for="item in typeList" :key="item['code']">
          {{ item['value'] }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="选择仓库">
      <a-select v-model:value="params.storeId" placeholder="选择仓库">
        <a-select-option v-for="opt in storeList" :key="opt['code']">
          {{ opt['value'] }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="订单状态">
      <a-select v-model:value="params.verifiStatus" placeholder="订单状态">
        <a-select-option value="">全部</a-select-option>
        <a-select-option value="0">创建</a-select-option>
        <a-select-option value="1">确认</a-select-option>
        <a-select-option value="2">失效</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="订单号">
      <a-input v-model:value="params.orderNo" placeholder="订单号" />
    </a-form-item>
  </a-form>
</template>
<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  export default {
    computed: {
      ...mapGetters({
        typeList: 'appStore/storeVerify/allVerifyTypeList',
        storeList: 'appStore/storeSelector/allStoreList',
      }),
    },
    data() {
      return {
        params: {
          orderNo: '',
          storeId: '',
          verifiCode: '',
          verifiStatus: '',
        },
      }
    },
    beforeMount() {
      this.getTypeList()
      this.querySysStore()
    },
    methods: {
      ...mapMutations({
        queryParam: 'appStore/storeVerify/queryParam',
      }),
      ...mapActions({
        getTypeList: 'appStore/storeVerify/verifyTypeList',
        querySysStore: 'appStore/storeSelector/querySysStore',
      }),
      submit() {
        this.queryParam(this.params)
      },
      clean() {
        this.queryParam()
        this.params = {
          orderNo: '',
          storeId: '',
          verifiCode: '',
          verifiStatus: '',
        }
      },
    },
  }
</script>
