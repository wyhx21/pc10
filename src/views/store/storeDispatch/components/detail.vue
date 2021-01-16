<template>
  <app-container>
    <template #header>
      <table class="app-store-dispatch-detail-head">
        <tr>
          <td width="35%">
            <span>订单号:</span>
            <span>{{ record['orderNo'] }}</span>
          </td>
          <td width="35%">
            <span>调出仓库:</span>
            <span>{{ record['storeName'] }}({{ record['storeCode'] }})</span>
          </td>
          <td>
            <span>更新人:</span>
            <span>{{ record['lastModifiedBy'] }}</span>
          </td>
        </tr>
        <tr>
          <td>
            <span>更新时间:</span>
            <span>{{ record['lastModifiedDate'] }}</span>
          </td>
          <td>
            <span>调入仓库:</span>
            <span>
              {{ record['toStoreName'] }}({{ record['toStoreCode'] }})
            </span>
          </td>
          <td>
            <span>状态:</span>
            <span>{{ record['disPacherStatusValue'] }}</span>
          </td>
        </tr>
      </table>
    </template>

    <a-table
      rowKey="id"
      :columns="columns"
      :data-source="dataList"
      size="small"
      :pagination="false"
    >
      <template #sourceArea="{ record }">
        <span>{{ record['areaName'] }}</span>
        <span>({{ record['areaCode'] }})</span>
      </template>
      <template #toArea="{ record }">
        <span>{{ record['toAreaName'] }}</span>
        <span>({{ record['toAreaCode'] }})</span>
      </template>
      <template #prod="{ record }">
        <span>{{ record['prodName'] }}</span>
        <span>({{ record['prodCode'] }})</span>
      </template>
      <template #num="{ record }">
        <span>{{ record['prodNum'] }}</span>
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
  import { mapGetters } from 'vuex'
  export default {
    components: {
      AppContainer,
    },
    computed: {
      ...mapGetters({
        dataList: 'appStore/storeDispatch/detailList',
        record: 'appStore/storeDispatch/currentData',
      }),
    },
    data() {
      return {
        currentRow: {},
        columns: [
          {
            title: '调出仓库区域',
            dataIndex: 'areaCode',
            slots: { customRender: 'sourceArea' },
          },
          {
            title: '调度商品信息',
            dataIndex: 'prodCode',
            slots: { customRender: 'prod' },
          },
          {
            title: '调度商品数量',
            dataIndex: 'id',
            slots: { customRender: 'num' },
          },
          {
            title: '调入仓库区域',
            dataIndex: 'toAreaCode',
            slots: { customRender: 'toArea' },
          },
          {
            title: '操作信息',
            dataIndex: 'lastModifiedBy',
            slots: { customRender: 'action' },
          },
        ],
      }
    },
  }
</script>
<style lang="scss">
  .app-store-dispatch-detail-head {
    width: calc(100% - 40px);
    margin: 5px 20px;
  }
</style>
