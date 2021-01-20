<template>
  <table width="100%">
    <tr>
      <td width="30%">
        <span>供应商编码:</span>
        <span>{{ data['supplierCode'] }}</span>
      </td>
      <td width="30%">
        <span>供应商名称:</span>
        <span>{{ data['supplierName'] }}</span>
      </td>
      <td>
        <span>订单号:</span>
        <span>{{ data['orderNo'] }}</span>
      </td>
    </tr>
    <tr>
      <td>
        <span>订单状态:</span>
        <span>{{ data['statusValue'] }}</span>
      </td>
      <td colspan="2">
        <span>更新时间:</span>
        <span>{{ data['lastModifiedDate'] }}</span>
      </td>
    </tr>
  </table>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters({
        data: 'appStore/instore/currentData',
      }),
    },
  }
</script>
