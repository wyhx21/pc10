<template>
  <app-container>
    <template #header>
      <table class="app-store-prod-detail_head">
        <tr>
          <td>
            <span>仓库信息:</span>
            <span>{{ currentDate['storeName'] }}</span>
            <span>({{ currentDate['storeCode'] }})</span>
          </td>
          <td>
            <span>商品信息:</span>
            <span>{{ currentDate['prodName'] }}</span>
            <span>({{ currentDate['prodCode'] }})</span>
          </td>
        </tr>
        <tr>
          <td>
            <span>区域信息:</span>
            <span>{{ currentDate['areaName'] }}</span>
            <span>({{ currentDate['areaCode'] }})</span>
          </td>
          <td>
            <span>商品数量:</span>
            <span>{{ currentDate['prodNum'] }}</span>
            <span>({{ currentDate['prodUnit'] }})</span>
          </td>
        </tr>
      </table>
    </template>

    <a-table
      rowKey="id"
      :columns="columns"
      :data-source="detailDataList"
      size="small"
      :pagination="false"
    ></a-table>

    <template #footer>
      <div class="app-store-prod-detail_footer">
        <app-pagination
          :total="detailTotal"
          :current="detailPageInfo['page']"
          @change="onPageChange"
        />
        <a-button size="small" @click="cancel">退出</a-button>
      </div>
    </template>
  </app-container>
</template>
<script>
  import AppContainer from '@com/flexContainer'
  import AppPagination from '@com/pagination'
  import { mapGetters, mapActions, mapMutations } from 'vuex'
  export default {
    components: {
      AppContainer,
      AppPagination,
    },
    computed: {
      ...mapGetters({
        currentDate: 'appStore/storeProd/currentData',
        detailPageInfo: 'appStore/storeProd/detailPageInfo',
        detailTotal: 'appStore/storeProd/detailTotal',
        detailDataList: 'appStore/storeProd/detailDataList',
      }),
    },
    data() {
      return {
        columns: [
          { title: '商品名称', dataIndex: 'prodName' },
          { title: '类型', dataIndex: 'detailType' },
          { title: '变更前', dataIndex: 'beforeNum' },
          { title: '改变量', dataIndex: 'changeNum' },
          { title: '变更后', dataIndex: 'afterNum' },
          { title: '单位', dataIndex: 'prodUnit' },
          { title: '订单号', dataIndex: 'orderNo' },
          { title: '修改人', dataIndex: 'lastModifiedBy' },
          { title: '修改时间', dataIndex: 'lastModifiedDate' },
        ],
      }
    },
    methods: {
      ...mapActions({
        queryDetail: 'appStore/storeProd/queryDetailPage',
      }),
      ...mapMutations({
        setPage: 'appStore/storeProd/detailPageInfo',
      }),
      onPageChange(page, size) {
        this.setPage({ page, size })
        this.queryDetail()
      },
      cancel() {
        this.$emit('cancel', false)
      },
    },
  }
</script>
<style lang="scss">
  .app-store-prod-detail_head {
    width: 100%;
    span {
      padding: 5px 3px;
    }

    td {
      padding: 5px 30px;
    }
  }
  .app-store-prod-detail_footer {
    .app-table_pagination {
      display: inline-block;
    }
    button {
      float: right;
      margin: 8px 10px;
      border-radius: 15px;
    }
  }
</style>
