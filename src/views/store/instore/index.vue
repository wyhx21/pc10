<template>
  <app-container>
    <template #param>
      <a-form layout="inline" :model="params">
        <a-form-item label="订单状态">
          <a-select v-model:value="params.orderStatus" placeholder="订单状态">
            <a-select-option value="">全部</a-select-option>
            <a-select-option value="2">交易</a-select-option>
            <a-select-option value="4">入库</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="订单号">
          <a-input v-model:value="params.orderNo" placeholder="订单号" />
        </a-form-item>
        <a-form-item label="供应商编码">
          <a-input v-model:value="params.cusCode" placeholder="供应商编码" />
        </a-form-item>
      </a-form>
    </template>

    <template #query>
      <a-button @click="resetParam" size="small">
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
      :pagination="false"
    >
      <template #action="{ record }">
        <a
          @click="editRecord(record)"
          v-if="perMerge && record['orderStatus'] == 2"
        >
          <EditOutlined />
        </a>
        <a
          @click="recordDetail(record)"
          v-if="perDetail && record['orderStatus'] == 4"
        >
          <PaperClipOutlined />
        </a>
      </template>
    </a-table>

    <template #footer>
      <app-pagination
        :current="currentPage"
        :total="totalPageSize"
        @change="onPageChange"
      />
    </template>

    <!-- 详情 begin -->
    <app-modal
      v-model:visible="visible.detail"
      :saveButton="null"
      title="入库详情"
      width="800px"
      height="350px"
    >
      <app-detail />
    </app-modal>
    <!-- 详情 end -->

    <!-- 入库 begin -->
    <app-modal
      v-model:visible="visible.merge"
      :loading="loading.merge"
      title="订单入库"
      width="800px"
      height="350px"
      @confirm="confirmMerge"
    >
      <app-edit />
    </app-modal>
    <!-- 入库 end -->
  </app-container>
</template>
<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  import AppContainer from '@com/container'
  import AppPagination from '@com/pagination'
  import AppModal from '@com/modal'
  import AppEdit from './components/instoreEdit'
  import AppDetail from './components/instoreDetail'
  import {
    RedoOutlined,
    SearchOutlined,
    EditOutlined,
    PaperClipOutlined,
  } from '@ant-design/icons-vue'
  export default {
    components: {
      SearchOutlined,
      RedoOutlined,
      EditOutlined,
      AppContainer,
      AppPagination,
      PaperClipOutlined,
      AppModal,
      AppEdit,
      AppDetail,
    },
    computed: {
      ...mapGetters({
        dataList: 'appStore/instore/dataList',
        perMerge: 'appStore/instore/perMerge',
        perDetail: 'appStore/instore/perDetail',
        totalPageSize: 'appStore/instore/totalPageSize',
        currentPage: 'appStore/instore/pageInfo',
      }),
      tableColumns() {
        if (this.perMerge || this.perDetail) {
          return this.columns
        } else {
          return this.columns.filter((item) => item['dataIndex'] != 'id')
        }
      },
    },
    data() {
      return {
        params: {
          orderNo: '',
          cusCode: '',
          orderStatus: '',
        },
        loading: {
          query: false,
          merge: false,
        },
        visible: {
          merge: false,
          detail: false,
        },
        columns: [
          { title: '订单号', dataIndex: 'orderNo', width: 200 },
          { title: '供应商编码', dataIndex: 'supplierCode' },
          { title: '供应商名称', dataIndex: 'supplierName' },
          { title: '订单状态', dataIndex: 'statusValue' },
          { title: '更新人', dataIndex: 'lastModifiedBy' },
          { title: '更新时间', dataIndex: 'lastModifiedDate' },
          { title: '备注', dataIndex: 'remark', ellipsis: true },
          {
            title: '操作',
            dataIndex: 'id',
            width: 50,
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
        pageInfo: 'appStore/instore/pageInfo',
        queryParam: 'appStore/instore/queryParam',
        currentData: 'appStore/instore/currentData',
        setStoreId: 'appStore/instore/storeId',
        clearArea: 'appStore/storeSelector/setStoreAreaList',
      }),
      ...mapActions({
        queryPage: 'appStore/instore/queryPage',
        queryDetail: 'appStore/instore/queryDetail',
        dataMerge: 'appStore/instore/dataMerge',
        queryOrderStoreDetail: 'appStore/instore/queryOrderStoreDetail',
      }),
      resetParam() {
        this.params = {
          orderNo: '',
          cusCode: '',
          orderStatus: '',
        }
      },
      initQueryData() {
        this.pageInfo()
        this.queryParam(this.params)
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
      editRecord(record) {
        this.clearArea()
        this.currentData(record)
        this.setStoreId()
        this.queryDetail()
        this.visible.merge = true
      },
      recordDetail(record) {
        this.currentData(record)
        this.queryOrderStoreDetail()
        this.visible.detail = true
      },
      confirmMerge() {
        this.loading.merge = true
        this.dataMerge()
          .then(() => {
            this.loading.merge = false
            this.visible.merge = false
            this.queryPage()
          })
          .catch(() => {
            this.loading.merge = false
          })
      },
    },
  }
</script>
