<template>
  <a-row align="middle">
    <a-col :span="3">{{ data['prodCode'] }}</a-col>
    <a-col :span="3">{{ data['prodName'] }}</a-col>
    <a-col :span="3">{{ data['prodUnit'] }}</a-col>
    <a-col :span="3">
      <a-input-number
        :precision="2"
        :value="data['price']"
        size="small"
        @update:value="updatePrice"
        placeholder="请输入单价"
      />
    </a-col>
    <a-col :span="3">
      <a-input-number
        :precision="2"
        :value="data['prodNum']"
        size="small"
        @update:value="updateNum"
        placeholder="请输入数量"
      />
    </a-col>
    <a-col :span="3">
      <app-price
        :modelValue="data['prodAmount']"
        placeholder="计算金额"
        :precision="2"
        color="red"
      />
    </a-col>
    <a-col :span="5">
      <a-input
        :value="data['itemRemark']"
        placeholder="备注信息"
        size="small"
        @update:value="updateRemark"
      />
    </a-col>
    <a-col :span="1">
      <a @click="deleteRowData"><DeleteOutlined /></a>
    </a-col>
  </a-row>
</template>
<script>
  import { mapMutations } from 'vuex'
  import AppPrice from '@com/fianceNum'
  import { DeleteOutlined } from '@ant-design/icons-vue'
  export default {
    components: {
      AppPrice,
      DeleteOutlined,
    },
    props: {
      data: {
        default: {},
      },
    },
    methods: {
      ...mapMutations({
        updateProduct: 'appOrder/purchaseOrder/persist/updateProduct',
        updateProdRemark: 'appOrder/purchaseOrder/persist/updateProdRemark',
        deleteOrderProduct: 'appOrder/purchaseOrder/persist/deleteOrderProduct',
      }),
      updatePrice(price) {
        const { id, prodNum } = this.data
        this.updateProduct({ id, price, prodNum })
      },
      updateNum(prodNum) {
        const { id, price } = this.data
        this.updateProduct({ id, price, prodNum })
      },
      updateRemark(itemRemark) {
        const { id } = this.data
        this.updateProdRemark({ id, itemRemark })
      },
      deleteRowData() {
        const { id } = this.data
        this.deleteOrderProduct(id)
      },
    },
  }
</script>
