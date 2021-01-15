<template>
  <div class="order-persist">
    <div class="order-persist-main_header">
      <a-row align="middle">
        <a-col :span="3">
          <span>供应商编码:</span>
        </a-col>
        <a-col :span="5">
          <a-input
            :value="supplier.supplierCode"
            placeholder="供应商编码"
            disabled
          />
        </a-col>
        <a-col :span="3">
          <span>供应商名称:</span>
        </a-col>
        <a-col :span="5">
          <a-input
            :value="supplier.supplierName"
            placeholder="供应商名称"
            disabled
          />
        </a-col>
        <a-col :span="3">
          <span>额外金额:</span>
        </a-col>
        <a-col :span="5">
          <a-input-number
            :precision="2"
            :value="supplier.extraAmount"
            @update:value="updateExtraAmount"
            placeholder="额外金额"
            allow-clear
            :disabled="!supplier.id"
          />
        </a-col>
      </a-row>
      <a-row align="middle">
        <a-col :span="3">
          <span>备注信息:</span>
        </a-col>
        <a-col :span="21">
          <a-textarea
            :value="supplier.remark"
            @update:value="updateRemark"
            placeholder="备注信息"
            :maxlength="50"
            allow-clear
            :disabled="!supplier.id"
          />
        </a-col>
      </a-row>
    </div>
    <div class="order-persist-main_table_header">
      <a-row align="middle">
        <a-col :span="3">商品编码</a-col>
        <a-col :span="3">商品名称</a-col>
        <a-col :span="3">单位</a-col>
        <a-col :span="3">单价</a-col>
        <a-col :span="3">数量</a-col>
        <a-col :span="3">金额</a-col>
        <a-col :span="5">备注</a-col>
        <a-col :span="1">
          <a @click="toPage('AppProduct')"><PlusCircleOutlined /></a>
        </a-col>
      </a-row>
    </div>

    <div class="order-persist-main_table_main">
      <div v-for="item of orderProductList" :key="item['id']">
        <app-product :data="item" />
      </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters, mapMutations } from 'vuex'
  import AppProduct from './persistMainProduct'
  import { PlusCircleOutlined } from '@ant-design/icons-vue'
  export default {
    components: {
      AppProduct,
      PlusCircleOutlined,
    },
    computed: {
      ...mapGetters({
        supplier: 'appOrder/purchaseOrder/persist/supplier',
        orderProductList: 'appOrder/purchaseOrder/persist/orderProductList',
      }),
    },
    methods: {
      ...mapMutations({
        updateExtraAmount: 'appOrder/purchaseOrder/persist/updateExtraAmount',
        updateRemark: 'appOrder/purchaseOrder/persist/updateRemark',
        toPage: 'appOrder/purchaseOrder/persist/toPage',
      }),
    },
  }
</script>
<style lang="scss">
  @import '@style/order.scss';
</style>
