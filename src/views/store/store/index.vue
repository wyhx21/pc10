<template>
  <app-container>
    <template #param>
      <app-param ref="refStoreParam" />
    </template>

    <template #query>
      <a-button @click="$refs.refStoreParam.clean()" size="small">
        <template #icon><RedoOutlined /></template>
        重置
      </a-button>
      <a-button
        type="primary"
        @click="persistRecord"
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
      @expand="expandStore"
    >
      <template #deleted="{ text }">
        <app-switch :modelValue="text" disabled />
      </template>
      <template #action="{ record }">
        <a @click="editRecord(record)" v-if="perMerge">
          <EditOutlined />
          编辑
        </a>
        <a-divider type="vertical" v-if="perMerge && perAreaPersist" />
        <a @click="persistAreaRecord(record)" v-if="perAreaPersist">
          <DiffOutlined />
          新增区域
        </a>
      </template>
      <template #expandedRowRender="{ record }" v-if="perAreaQuery">
        <app-area-table
          :storeId="record['id']"
          :areaList="record['areaList']"
        />
      </template>
    </a-table>

    <template #footer>
      <app-pagination
        :total="totalPageSize"
        :current="currentPage"
        @change="onPageChange"
      />
    </template>

    <!-- 仓库编辑 begin -->
    <app-modal
      title="仓库编辑"
      width="400px"
      height="380px"
      @confirm="confirmMerge"
      v-model:visible="visible.merge"
    >
      <app-edit ref="refStoreEdit" />
    </app-modal>
    <!-- 仓库编辑 end -->

    <!-- 仓库新增 begin -->
    <app-modal
      title="仓库新增"
      width="400px"
      height="380px"
      @confirm="confirmPersist"
      v-model:visible="visible.persist"
    >
      <app-persist ref="refStorePersist" />
    </app-modal>
    <!-- 仓库新增 end -->

    <!-- 仓库区域新增 begin -->
    <app-modal
      title="仓库区域新增"
      width="400px"
      height="360px"
      @confirm="confirmAreaPersist"
      v-model:visible="visible.areaPersist"
    >
      <app-area-persist ref="refStoreAreaPersist" />
    </app-modal>
    <!-- 仓库区域新增 end -->
  </app-container>
</template>
<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  import AppParam from './components/param'
  import AppContainer from '@com/container'
  import AppPagination from '@com/pagination'
  import AppSwitch from '@com/switch'
  import AppModal from '@com/modal'
  import AppEdit from './components/storeEdit'
  import AppPersist from './components/storePersist'
  import AppAreaTable from './components/storeArea'
  import AppAreaPersist from './components/areaPersist'
  import {
    RedoOutlined,
    SearchOutlined,
    EditOutlined,
    DiffOutlined,
    PlusCircleOutlined,
  } from '@ant-design/icons-vue'
  export default {
    components: {
      AppParam,
      SearchOutlined,
      EditOutlined,
      PlusCircleOutlined,
      RedoOutlined,
      DiffOutlined,
      AppContainer,
      AppPagination,
      AppSwitch,
      AppModal,
      AppEdit,
      AppPersist,
      AppAreaTable,
      AppAreaPersist,
    },
    computed: {
      ...mapGetters({
        dataList: 'appStore/store/dataList',
        perPersist: 'appStore/store/perPersist',
        perMerge: 'appStore/store/perMerge',
        perAreaQuery: 'appStore/store/perAreaQuery',
        perAreaPersist: 'appStore/store/perAreaPersist',
        totalPageSize: 'appStore/store/totalPageSize',
        currentPage: 'appStore/store/pageInfo',
      }),
      tableColumns() {
        if (this.perMerge || this.perAreaPersist) {
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
          merge: false,
          persist: false,
          areaPersist: false,
        },
        columns: [
          { title: '仓库编码', dataIndex: 'storeCode' },
          { title: '仓库名称', dataIndex: 'storeName' },
          {
            title: '状态',
            dataIndex: 'deleted',
            slots: { customRender: 'deleted' },
          },
          { title: '地址', dataIndex: 'address', ellipsis: true },
          { title: '备注', dataIndex: 'remark', ellipsis: true },
          { title: '更新人', dataIndex: 'lastModifiedBy' },
          { title: '更新时间', dataIndex: 'lastModifiedDate', width: 160 },
          {
            title: '操作',
            dataIndex: 'id',
            width: 180,
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
        pageInfo: 'appStore/store/pageInfo',
        currentData: 'appStore/store/currentData',
        currentArea: 'appStore/store/currentArea',
      }),
      ...mapActions({
        queryPage: 'appStore/store/queryPage',
        dataMerge: 'appStore/store/dataMerge',
        dataPersist: 'appStore/store/dataPersist',
        storeAreaQuery: 'appStore/store/storeAreaQuery',
        storeAreaPersist: 'appStore/store/storeAreaPersist',
      }),
      initQueryData() {
        this.pageInfo()
        this.$refs.refStoreParam.submit()
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
        this.visible.merge = true
      },
      confirmMerge() {
        this.$refs.refStoreEdit.submit()
        this.dataMerge()
          .then(() => {
            this.visible.merge = false
            this.queryData()
          })
          .catch(() => {})
      },
      persistRecord() {
        this.currentData({ id: 0, deleted: 0 })
        this.visible.persist = true
      },
      confirmPersist() {
        this.$refs.refStorePersist.submit()
        this.dataPersist()
          .then(() => {
            this.visible.persist = false
            this.queryData()
          })
          .catch(() => {})
      },
      expandStore(expand, record) {
        if (expand) {
          this.storeAreaQuery(record)
        }
      },
      persistAreaRecord({ id }) {
        this.currentArea({ id: 0, storeId: id, deleted: 0 })
        this.visible.areaPersist = true
      },
      confirmAreaPersist() {
        this.$refs.refStoreAreaPersist.submit()
        this.storeAreaPersist()
          .then(() => {
            this.visible.areaPersist = false
            this.queryData()
          })
          .catch(() => {})
      },
    },
  }
</script>
