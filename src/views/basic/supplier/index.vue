<template>
  <app-container>
    <template #param>
      <app-param ref="refSupplierParam" />
    </template>

    <template #query>
      <a-button @click="$refs.refSupplierParam.clean()" size="small">
        <template #icon><RedoOutlined /></template>
        重置
      </a-button>
      <a-button
        type="primary"
        @click="showUpload"
        size="small"
        v-if="perUpload"
      >
        <template #icon><CloudUploadOutlined /></template>
        导入
      </a-button>
      <a-button
        type="primary"
        @click="exportRecord"
        size="small"
        v-if="perExport"
        :loading="loading.export"
      >
        <template #icon><FileExcelOutlined /></template>
        导出
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
    >
      <template #deleted="{ text }">
        <app-switch :modelValue="text" disabled />
      </template>
      <template #action="{ record }">
        <a @click="editRecord(record)" v-if="perMerge"><EditOutlined /></a>
      </template>
    </a-table>

    <template #footer>
      <app-pagination
        :total="totalPageSize"
        :current="currentPage"
        @change="onPageChange"
      />
    </template>

    <!-- 供应商编辑 begin -->
    <app-modal
      title="供应商编辑"
      width="400px"
      height="500px"
      @confirm="confirmMerge"
      v-model:visible="visible.merge"
    >
      <app-edit ref="refSupplierEdit" />
    </app-modal>
    <!-- 供应商编辑 end -->

    <!-- 供应商新增 begin -->
    <app-modal
      title="供应商新增"
      width="400px"
      height="500px"
      @confirm="confirmPersist"
      v-model:visible="visible.persist"
    >
      <app-persist ref="refSupplierPersist" />
    </app-modal>
    <!-- 供应商新增 end -->

    <!-- 客户导入 begin -->
    <app-upload
      url="/basic/supplier/upload"
      tempUrl="/common/download/supExcel"
      v-model:visible="visible.upload"
      @success="uploadSuccess"
    />
    <!-- 客户导入 end -->
  </app-container>
</template>
<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  import AppParam from './components/param'
  import AppContainer from '@com/container'
  import AppPagination from '@com/pagination'
  import AppSwitch from '@com/switch'
  import AppModal from '@com/modal'
  import AppEdit from './components/supplierEdit'
  import AppPersist from './components/supplierPersist'
  import AppUpload from '@com/upload'
  import {
    RedoOutlined,
    SearchOutlined,
    EditOutlined,
    PlusCircleOutlined,
    FileExcelOutlined,
    CloudUploadOutlined,
  } from '@ant-design/icons-vue'
  export default {
    components: {
      AppParam,
      SearchOutlined,
      EditOutlined,
      PlusCircleOutlined,
      FileExcelOutlined,
      CloudUploadOutlined,
      RedoOutlined,
      AppContainer,
      AppPagination,
      AppSwitch,
      AppModal,
      AppEdit,
      AppPersist,
      AppUpload,
    },
    computed: {
      ...mapGetters({
        dataList: 'appBasic/supplier/dataList',
        perPersist: 'appBasic/supplier/perPersist',
        perMerge: 'appBasic/supplier/perMerge',
        perExport: 'appBasic/supplier/perExport',
        perUpload: 'appBasic/supplier/perUpload',
        totalPageSize: 'appBasic/supplier/totalPageSize',
        currentPage: 'appBasic/supplier/pageInfo',
      }),
      tableColumns() {
        if (this.perMerge) {
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
          export: false,
        },
        visible: {
          merge: false,
          persist: false,
          upload: false,
        },
        columns: [
          { title: '供应商编码', dataIndex: 'supplierCode', width: 120 },
          { title: '供应商名称', dataIndex: 'supplierName', width: 120 },
          { title: '联系人', dataIndex: 'linkName', width: 100 },
          { title: '性别', dataIndex: 'sexValue', width: 50 },
          { title: '联系方式', dataIndex: 'mobile', width: 120 },
          {
            title: '状态',
            dataIndex: 'deleted',
            width: 100,
            slots: { customRender: 'deleted' },
          },
          { title: '地址', dataIndex: 'address', ellipsis: true },
          { title: '备注', dataIndex: 'remark', ellipsis: true },
          { title: '更新人', dataIndex: 'lastModifiedBy', width: 100 },
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
        pageInfo: 'appBasic/supplier/pageInfo',
        currentData: 'appBasic/supplier/currentData',
      }),
      ...mapActions({
        queryPage: 'appBasic/supplier/queryPage',
        dataMerge: 'appBasic/supplier/dataMerge',
        dataPersist: 'appBasic/supplier/dataPersist',
        exportData: 'appBasic/supplier/exportData',
      }),
      initQueryData() {
        this.pageInfo()
        this.$refs.refSupplierParam.submit()
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
        this.$refs.refSupplierEdit.submit()
        this.dataMerge()
          .then(() => {
            this.visible.merge = false
            this.queryData()
          })
          .catch(() => {})
      },
      persistRecord() {
        this.currentData({ id: 0, deleted: 0, sex: 0 })
        this.visible.persist = true
      },
      confirmPersist() {
        this.$refs.refSupplierPersist.submit()
        this.dataPersist()
          .then(() => {
            this.visible.persist = false
            this.queryData()
          })
          .catch(() => {})
      },
      exportRecord() {
        this.loading.export = true
        this.exportData()
          .then(() => {
            this.loading.export = false
          })
          .catch(() => {
            this.loading.export = false
          })
      },
      showUpload() {
        this.visible.upload = true
      },
      uploadSuccess() {
        this.visible.upload = false
        this.initQueryData()
      },
    },
  }
</script>
