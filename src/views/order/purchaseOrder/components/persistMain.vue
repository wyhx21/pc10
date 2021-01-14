<template>
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

  <div class="order-persist-main"></div>
</template>
<script>
  import { mapGetters, mapMutations } from 'vuex'
  export default {
    computed: {
      ...mapGetters({
        supplier: 'appOrder/purchaseOrder/persist/supplier',
      }),
    },
    methods: {
      ...mapMutations({
        updateExtraAmount: 'appOrder/purchaseOrder/persist/updateExtraAmount',
        updateRemark: 'appOrder/purchaseOrder/persist/updateRemark',
      }),
    },
  }
</script>
<style lang="scss" scope>
  .order-persist-main_header {
    margin: 20px 0 10px;
    height: 90px;

    .ant-row {
      margin: 5px;
    }

    .ant-col-3 {
      text-align: center;
    }
    .ant-col-5 {
      .ant-input-number {
        width: 100%;
      }
    }
  }

  .order-persist-main {
    background-color: #ccc;
    height: calc(100% - 120px);
  }
</style>
