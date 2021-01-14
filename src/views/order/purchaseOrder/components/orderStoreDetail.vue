<template>
  <app-container>
    <a-table
      rowKey="id"
      :columns="columns"
      :data-source="detailList"
      size="small"
      :pagination="false"
    />
  </app-container>
</template>
<script>
  import { mapGetters } from 'vuex'
  import AppContainer from './detail'
  export default {
    components: {
      AppContainer,
    },
    computed: {
      ...mapGetters({
        detailList: 'appOrder/purchaseOrder/detailList',
      }),
    },
    data() {
      return {
        columns: [
          { title: '商品编码', dataIndex: 'prodCode' },
          { title: '商品名称', dataIndex: 'prodName' },
          { title: '商品数量', dataIndex: 'changeNum' },
          { title: '单位', dataIndex: 'prodUnit' },
          { title: '仓库编码', dataIndex: 'storeCode' },
          { title: '仓库名称', dataIndex: 'storeName' },
          { title: '区域编码', dataIndex: 'areaCode' },
          { title: '区域名称', dataIndex: 'areaName' },
          { title: '修改人', dataIndex: 'lastModifiedBy' },
          { title: '修改时间', dataIndex: 'lastModifiedDate' },
        ],
      }
    },
  }
</script>
