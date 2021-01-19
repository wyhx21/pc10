<template>
  <app-container>
    <template #param>
      <app-param ref="refStoreVerifyParam" />
    </template>

    <template #query>
      <a-button @click="$refs.refStoreVerifyParam.clean()" size="small">
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
        <a @click="queryDetail(record)" v-if="perDetail">
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
      v-model:visible="visible.detail"
    >
      <app-detail @cancel="visible.detail = false" />
    </app-modal>
    <!-- 详情 end -->
  </app-container>
</template>
<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  import AppParam from './components/param'
  import AppContainer from '@com/container'
  import AppPagination from '@com/pagination'
  import AppModal from '@com/modalBlank'
  import AppDetail from './components/detail'
  import {
    RedoOutlined,
    SearchOutlined,
    PaperClipOutlined,
  } from '@ant-design/icons-vue'
  export default {
    components: {
      AppParam,
      SearchOutlined,
      PaperClipOutlined,
      RedoOutlined,
      AppContainer,
      AppPagination,
      AppModal,
      AppDetail,
    },
    computed: {
      ...mapGetters({
        dataList: 'appStore/storeVerify/dataList',
        perDetail: 'appStore/storeVerify/perDetail',
        totalPageSize: 'appStore/storeVerify/totalPageSize',
        currentPage: 'appStore/storeVerify/pageInfo',
      }),
      tableColumns() {
        if (this.perDetail) {
          return this.columns
        } else {
          return this.columns.filter((item) => item['dataIndex'] != 'id')
        }
      },
    },
    data() {
      return {
        loading: {
          query: false,
        },
        visible: {
          detail: false,
        },
        columns: [
          { title: '订单号', dataIndex: 'orderNo', width: 200 },
          { title: '仓库编码', dataIndex: 'storeCode', width: 150 },
          { title: '仓库名称', dataIndex: 'storeName', width: 150 },
          { title: '订单状态', dataIndex: 'verifiStatusValue', width: 150 },
          { title: '核销类型', dataIndex: 'verifiValue', width: 150 },
          { title: '备注', dataIndex: 'remark', ellipsis: true },
          { title: '更新人', dataIndex: 'lastModifiedBy', width: 150 },
          { title: '更新时间', dataIndex: 'lastModifiedDate', width: 160 },
          {
            title: '详情',
            dataIndex: 'id',
            slots: { customRender: 'action' },
            width: 50,
          },
        ],
      }
    },
    beforeMount() {
      this.queryData()
    },
    methods: {
      ...mapMutations({
        pageInfo: 'appStore/storeVerify/pageInfo',
        currentData: 'appStore/storeVerify/currentData',
      }),
      ...mapActions({
        queryPage: 'appStore/storeVerify/queryPage',
        queryDetailData: 'appStore/storeVerify/queryDetail',
      }),
      initQueryData() {
        this.pageInfo()
        this.$refs.refStoreVerifyParam.submit()
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
      queryDetail(record) {
        this.currentData(record)
        this.queryDetailData()
        this.visible.detail = true
      },
    },
  }
</script>
