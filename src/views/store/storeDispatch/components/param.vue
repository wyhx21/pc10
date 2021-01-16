<template>
  <a-form layout="inline" :model="params" class="app-param-form_1">
    <a-form-item label="调出仓库">
      <a-select v-model:value="params.sourceStoreId" placeholder="调出仓库">
        <a-select-option v-for="opt in storeList" :key="opt['code']">
          {{ opt['value'] }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="调入仓库">
      <a-select v-model:value="params.toStoreId" placeholder="调入仓库">
        <a-select-option v-for="opt in storeList" :key="opt['code']">
          {{ opt['value'] }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="订单状态">
      <a-select v-model:value="params.disPacherStatus" placeholder="订单状态">
        <a-select-option value="">全部</a-select-option>
        <a-select-option value="0">创建</a-select-option>
        <a-select-option value="1">确认</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="订单号">
      <a-input v-model:value="params.orderNo" placeholder="订单号" />
    </a-form-item>
  </a-form>
</template>
<script>
  import { mapMutations, mapGetters, mapActions } from 'vuex'
  export default {
    computed: {
      ...mapGetters({
        storeList: 'appStore/storeSelector/allStoreList',
      }),
    },
    data() {
      return {
        dataRange: [],
        params: {
          disPacherStatus: '',
          orderNo: '',
          sourceStoreId: '',
          toStoreId: '',
        },
      }
    },
    beforeMount() {
      this.querySysStore()
    },
    methods: {
      ...mapActions({
        querySysStore: 'appStore/storeSelector/querySysStore',
      }),
      ...mapMutations({
        queryParam: 'appStore/storeDispatch/queryParam',
      }),
      submit() {
        this.queryParam(this.params)
      },
      clean() {
        this.queryParam()
        this.params = {
          disPacherStatus: '',
          orderNo: '',
          sourceStoreId: '',
          toStoreId: '',
        }
      },
    },
  }
</script>
