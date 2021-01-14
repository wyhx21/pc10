<template>
  <app-container>
    <template #param>
      <app-param ref="refPurchaseOrderParam" />
    </template>

    <template #query>
      <a-button @click="$refs.refPurchaseOrderParam.clean()" size="small">
        <template #icon><RedoOutlined /></template>
        重置
      </a-button>
      <a-button
        type="primary"
        :loading="loading.query"
        @click="initQueryData"
        size="small"
      >
        <template #icon><SearchOutlined /></template>
        查询
      </a-button>
    </template>

    <a-table
      rowKey="id"
      :columns="tableColumns"
      :data-source="dataList"
      :loading="loading.query"
      size="small"
      :scroll="{ x: 1500 }"
      :pagination="false"
    >
      <template #orderNo="{ record, text }">
        <span v-if="!perDetailStore">{{ text }}</span>
        <span v-else-if="record['orderStatus'] != 4">{{ text }}</span>
        <a v-else @click="recordStoreDetail(record)">{{ text }}</a>
      </template>
      <template #price="{ text }">
        <app-price :modelValue="text" />
      </template>
      <template #action="{ record }">
        <a @click="recordOrderDetail(record)" v-if="perDetailOrder">
          <PaperClipOutlined />
        </a>
      </template>
    </a-table>

    <template #footer>
      <app-pagination
        :total="totalPageSize"
        :current="currentPage"
        @change="onPageChange"
      />
    </template>

    <!-- 详情 begin -->
    <app-modal
      width="800px"
      height="450px"
      :maskClosable="false"
      v-model:visible="detail.visible"
    >
      <component @cancel="detail.visible = false" :is="detail.conponent" />
    </app-modal>
    <!-- 详情 end -->
  </app-container>
</template>
<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  import AppContainer from '@com/container'
  import AppPrice from '@com/fianceNum'
  import AppParam from './components/param'
  import AppOrderDetail from './components/orderDetail'
  import AppOrderStoreDetail from './components/orderStoreDetail'
  import AppPagination from '@com/pagination'
  import AppModal from '@com/modalBlank'
  import {
    RedoOutlined,
    SearchOutlined,
    PaperClipOutlined,
  } from '@ant-design/icons-vue'

  export default {
    components: {
      AppParam,
      AppContainer,
      RedoOutlined,
      SearchOutlined,
      AppPagination,
      PaperClipOutlined,
      AppPrice,
      AppOrderDetail,
      AppOrderStoreDetail,
      AppModal,
    },
    computed: {
      ...mapGetters({
        dataList: 'appOrder/purchaseOrder/dataList',
        totalPageSize: 'appOrder/purchaseOrder/totalPageSize',
        currentPage: 'appOrder/purchaseOrder/pageInfo',
        perDetailOrder: 'appOrder/purchaseOrder/perDetailOrder',
        perDetailStore: 'appOrder/purchaseOrder/perDetailStore',
      }),
      tableColumns() {
        if (this.perDetailOrder) {
          return this.columns
        } else {
          return this.columns.filter((item) => item['dataIndex'] != 'id')
        }
      },
    },
    data() {
      return {
        detail: {
          visible: false,
          conponent: '',
        },
        loading: {
          query: false,
        },
        columns: [
          {
            title: '订单号',
            dataIndex: 'orderNo',
            fixed: 'left',
            width: 200,
            slots: { customRender: 'orderNo' },
          },
          { title: '供应商编码', dataIndex: 'supplierCode', width: 120 },
          { title: '供应商名称', dataIndex: 'supplierName', width: 120 },
          {
            title: '订单金额',
            dataIndex: 'orderAmount',
            align: 'right',
            width: 120,
            slots: { customRender: 'price' },
          },
          {
            title: '额外金额',
            dataIndex: 'extraAmount',
            align: 'right',
            width: 120,
            slots: { customRender: 'price' },
          },
          {
            title: '订单状态',
            dataIndex: 'statusValue',
            align: 'center',
            width: 120,
          },
          { title: '更新人', dataIndex: 'lastModifiedBy', width: 120 },
          { title: '创建时间', dataIndex: 'createdDate', width: 160 },
          { title: '生效时间', dataIndex: 'orderTime', width: 160 },
          { title: '备注', dataIndex: 'remark', ellipsis: true },
          {
            title: '详情',
            dataIndex: 'id',
            width: 50,
            fixed: 'right',
            slots: { customRender: 'action' },
          },
        ],
      }
    },
    beforeMount() {
      this.queryData()
    },
    methods: {
      ...mapMutations({
        pageInfo: 'appOrder/purchaseOrder/pageInfo',
        setCurrentData: 'appOrder/purchaseOrder/currentData',
      }),
      ...mapActions({
        queryPage: 'appOrder/purchaseOrder/queryPage',
        queryOrderDetail: 'appOrder/purchaseOrder/queryOrderDetail',
        queryDetailStore: 'appOrder/purchaseOrder/queryDetailStore',
      }),
      initQueryData() {
        this.pageInfo()
        this.$refs.refPurchaseOrderParam.submit()
        this.queryData()
      },
      onPageChange(page, size) {
        this.pageInfo({ page, size })
        this.queryData()
      },
      queryData() {
        this.loading.query = true
        this.queryPage()
          .then(() => {
            this.loading.query = false
          })
          .catch(() => {
            this.loading.query = false
          })
      },
      recordOrderDetail(record) {
        this.setCurrentData(record)
        this.queryOrderDetail()
        this.detail.conponent = 'AppOrderDetail'
        this.detail.visible = true
      },
      recordStoreDetail(record) {
        this.setCurrentData(record)
        this.queryDetailStore()
        this.detail.conponent = 'AppOrderStoreDetail'
        this.detail.visible = true
      },
    },
  }
</script>
