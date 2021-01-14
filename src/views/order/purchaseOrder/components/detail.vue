<template>
  <app-container>
    <template #header>
      <table class="app-purchase-order-detail_head">
        <tr>
          <td>
            <span>订单号:</span>
            <span>{{ currentDate['orderNo'] }}</span>
          </td>
          <td>
            <span>供应商编码:</span>
            <span>{{ currentDate['supplierCode'] }}</span>
          </td>
          <td>
            <span>供应商名称:</span>
            <span>{{ currentDate['supplierName'] }}</span>
          </td>
          <td>
            <span>状态:</span>
            <span>{{ currentDate['statusValue'] }}</span>
          </td>
        </tr>
        <tr>
          <td>
            <span>创建时间:</span>
            <span>{{ currentDate['createdDate'] }}</span>
          </td>
          <td>
            <span>订单金额:</span>
            <span><app-price :modelValue="currentDate['orderAmount']" /></span>
          </td>
          <td>
            <span>额外金额:</span>
            <span><app-price :modelValue="currentDate['extraAmount']" /></span>
          </td>
        </tr>
      </table>
    </template>
    <slot></slot>
    <template #footer>
      <div class="app-purchase-order-detail_footer">
        <slot name="footer">
          <a-button size="small" @click="cancel">退出</a-button>
        </slot>
      </div>
    </template>
  </app-container>
</template>
<script>
  import AppContainer from '@com/flexContainer'
  import { mapGetters } from 'vuex'
  import AppPrice from '@com/fianceNum'
  export default {
    components: {
      AppContainer,
      AppPrice,
    },
    computed: {
      ...mapGetters({
        currentDate: 'appOrder/purchaseOrder/currentData',
      }),
    },
    methods: {
      cancel() {
        this.$emit('cancel', false)
      },
    },
  }
</script>
<style lang="scss">
  .app-purchase-order-detail_head {
    width: calc(100% - 40px);
    margin: 0 20px;
    span {
      padding: 5px 3px;
    }

    td {
      padding: 5px 10px;
    }

    .app-fiance-num {
      display: inline-block;
      span {
        padding: 0;
      }
    }
  }
  .app-purchase-order-detail_footer {
    button {
      float: right;
      margin: 8px 10px;
      border-radius: 15px;
    }
  }
</style>
