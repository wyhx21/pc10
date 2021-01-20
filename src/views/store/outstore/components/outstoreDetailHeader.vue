<template>
  <table width="100%">
    <tr>
      <td width="30%">
        <span>客户编码:</span>
        <span>{{ data['cusCode'] }}</span>
      </td>
      <td width="30%">
        <span>客户名称:</span>
        <span>{{ data['cusName'] }}</span>
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
        data: 'appStore/outstore/currentData',
      }),
    },
  }
</script>
