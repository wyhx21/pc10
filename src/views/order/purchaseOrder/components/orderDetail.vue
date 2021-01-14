<template>
  <app-container>
    <a-table
      rowKey="id"
      :columns="columns"
      :data-source="detailList"
      size="small"
      :pagination="false"
    >
      <template #price="{ text }">
        <app-price :modelValue="text" />
      </template>
    </a-table>
  </app-container>
</template>
<script>
  import { mapGetters } from 'vuex'
  import AppContainer from './detail'
  import AppPrice from '@com/fianceNum'
  export default {
    components: {
      AppContainer,
      AppPrice,
    },
    computed: {
      ...mapGetters({
        detailList: 'appOrder/purchaseOrder/detailList',
      }),
    },
    data() {
      return {
        columns: [
          { title: '商品编码', dataIndex: 'prodCode', width: 100 },
          { title: '商品名称', dataIndex: 'prodName', width: 100 },
          { title: '单位', dataIndex: 'prodUnit', width: 100, align: 'center' },
          {
            title: '单价',
            dataIndex: 'prodPrice',
            width: 100,
            align: 'right',
            slots: { customRender: 'price' },
          },
          { title: '数量', dataIndex: 'prodNum', align: 'right', width: 100 },
          {
            title: '金额',
            dataIndex: 'prodAmount',
            width: 100,
            align: 'right',
            slots: { customRender: 'price' },
          },
          { title: '备注', dataIndex: 'remark', ellipsis: true },
        ],
      }
    },
  }
</script>
