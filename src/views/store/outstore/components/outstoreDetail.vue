<template>
  <app-container>
    <template #header>
      <app-header />
    </template>

    <a-table
      rowKey="id"
      :columns="columns"
      :data-source="dataList"
      size="small"
      :pagination="false"
    >
      <template #store="{ record }">
        <span>{{ record['storeName'] }}</span>
        <span>({{ record['storeCode'] }})</span>
      </template>
      <template #area="{ record }">
        <span>{{ record['areaName'] }}</span>
        <span>({{ record['areaCode'] }})</span>
      </template>
      <template #prod="{ record }">
        <span>{{ record['prodName'] }}</span>
        <span>({{ record['prodCode'] }})</span>
      </template>
      <template #num="{ record, text }">
        <span>{{ text }}</span>
        <span>({{ record['prodUnit'] }})</span>
      </template>
      <template #action="{ record }">
        <span>{{ record['lastModifiedBy'] }}</span>
        <span>({{ record['lastModifiedDate'] }})</span>
      </template>
    </a-table>
  </app-container>
</template>
<script>
  import AppContainer from '@com/flexContainer'
  import AppHeader from './outstoreDetailHeader'
  import { mapGetters } from 'vuex'
  export default {
    components: {
      AppContainer,
      AppHeader,
    },
    computed: {
      ...mapGetters({
        dataList: 'appStore/outstore/details',
      }),
    },
    data() {
      return {
        currentRow: {},
        columns: [
          {
            title: '仓库信息',
            dataIndex: 'storeCode',
            slots: { customRender: 'store' },
          },
          {
            title: '区域信息',
            dataIndex: 'areaCode',
            slots: { customRender: 'area' },
          },
          {
            title: '商品信息',
            dataIndex: 'prodCode',
            slots: { customRender: 'prod' },
          },
          {
            title: '数量',
            dataIndex: 'changeNum',
            slots: { customRender: 'num' },
          },
          {
            title: '操作信息',
            dataIndex: 'id',
            slots: { customRender: 'action' },
          },
        ],
      }
    },
  }
</script>
