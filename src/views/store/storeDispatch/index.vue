<template>
  <app-container>
    <template #param>
      <app-param ref="refStoreDispatchParam" />
    </template>

    <template #query>
      <a-button @click="$refs.refStoreDispatchParam.clean()" size="small">
        <template #icon><RedoOutlined /></template>
        重置
      </a-button>
      <a-button
        type="primary"
        @click="persistData"
        size="small"
        v-if="perPersist"
      >
        <template #icon><PlusCircleOutlined /></template>
        新增
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
        <a @click="editRecord(record)" v-if="perDetail"><EditOutlined /></a>
      </template>
    </a-table>

    <template #footer>
      <app-pagination
        :current="currentPage"
        :total="totalPageSize"
        @change="onPageChange"
      />
    </template>
    <!-- 新增 begin -->
    <app-modal
      v-model:visible="visible.persist"
      :maskClosable="false"
      :loading="loading.persist"
      title="调度新增"
      width="800px"
      height="350px"
      @confirm="confirmPersist"
    >
      <app-persist @cancel="visible.persist = false" @refresh="refreshData" />
    </app-modal>
    <!-- 新增 end -->

    <!-- 详情 begin -->
    <app-modal-blank
      v-model:visible="visible.detail"
      :maskClosable="false"
      width="800px"
      height="450px"
    >
      <app-detail @cancel="visible.detail = false" @refresh="refreshData" />
    </app-modal-blank>
    <!-- 详情 end -->
  </app-container>
</template>
<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  import AppContainer from '@com/container'
  import AppPagination from '@com/pagination'
  import AppModal from '@com/modal'
  import AppModalBlank from '@com/modalBlank'
  import AppParam from './components/param'
  import AppDetail from './components/detail'
  import AppPersist from './components/persist'
  import {
    RedoOutlined,
    SearchOutlined,
    EditOutlined,
    PlusCircleOutlined,
  } from '@ant-design/icons-vue'
  export default {
    components: {
      SearchOutlined,
      EditOutlined,
      PlusCircleOutlined,
      RedoOutlined,
      AppContainer,
      AppPagination,
      AppParam,
      AppModal,
      AppModalBlank,
      AppDetail,
      AppPersist,
    },
    computed: {
      ...mapGetters({
        dataList: 'appStore/storeDispatch/dataList',
        perPersist: 'appStore/storeDispatch/perPersist',
        perDetail: 'appStore/storeDispatch/perDetail',
        totalPageSize: 'appStore/storeDispatch/totalPageSize',
        currentPage: 'appStore/storeDispatch/pageInfo',
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
          persist: false,
        },
        visible: {
          detail: false,
          persist: false,
        },
        columns: [
          { title: '订单号', dataIndex: 'orderNo', width: 200 },
          { title: '调出仓库编码', dataIndex: 'storeCode', width: 120 },
          { title: '调出仓库名称', dataIndex: 'storeName', width: 120 },
          { title: '调入仓库编码', dataIndex: 'toStoreCode', width: 120 },
          { title: '调入仓库名称', dataIndex: 'toStoreName', width: 120 },
          { title: '状态', dataIndex: 'disPacherStatusValue', width: 120 },
          { title: '备注', dataIndex: 'remark', ellipsis: true },
          { title: '更新人', dataIndex: 'lastModifiedBy', width: 120 },
          { title: '更新时间', dataIndex: 'lastModifiedDate', width: 160 },
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
        pageInfo: 'appStore/storeDispatch/pageInfo',
        currentData: 'appStore/storeDispatch/currentData',
        persistInit: 'appStore/storeDispatch/persist/init',
      }),
      ...mapActions({
        queryPage: 'appStore/storeDispatch/queryPage',
        queryDetail: 'appStore/storeDispatch/queryDetail',
        persistRecord: 'appStore/storeDispatch/persist/persistRecord',
      }),
      initQueryData() {
        this.pageInfo()
        this.$refs.refStoreDispatchParam.submit()
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
        this.currentData(record)
        this.queryDetail()
        this.visible.detail = true
      },
      refreshData() {
        this.visible.detail = false
        this.visible.persist = false
        this.queryData()
      },
      persistData() {
        this.persistInit()
        this.visible.persist = true
      },
      confirmPersist() {
        this.loading.persist = true
        this.persistRecord()
          .then(() => {
            this.loading.persist = false
            this.visible.persist = false
            this.queryData()
          })
          .catch(() => {
            this.loading.persist = false
          })
      },
    },
  }
</script>
