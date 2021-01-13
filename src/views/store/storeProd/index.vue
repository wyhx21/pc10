<template>
  <app-container>
    <template #param>
      <app-param ref="refStoreProdParam" />
    </template>

    <template #query>
      <a-button @click="$refs.refStoreProdParam.clean()" size="small">
        <template #icon><RedoOutlined /></template>
        重置
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

    <!-- 详情 bgin -->
    <!-- 详情 end -->
  </app-container>
</template>
<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  import AppParam from './components/param'
  import AppContainer from '@com/container'
  import AppPagination from '@com/pagination'
  import {
    RedoOutlined,
    SearchOutlined,
    PaperClipOutlined,
    FileExcelOutlined,
  } from '@ant-design/icons-vue'
  export default {
    components: {
      AppParam,
      SearchOutlined,
      PaperClipOutlined,
      FileExcelOutlined,
      RedoOutlined,
      AppContainer,
      AppPagination,
    },
    computed: {
      ...mapGetters({
        dataList: 'appStore/storeProd/dataList',
        perDetail: 'appStore/storeProd/perDetail',
        perExport: 'appStore/storeProd/perExport',
        totalPageSize: 'appStore/storeProd/totalPageSize',
        currentPage: 'appStore/storeProd/currentPage',
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
          export: false,
        },
        visible: {
          detail: false,
        },
        columns: [
          { title: '仓库编码', dataIndex: 'storeCode' },
          { title: '仓库名称', dataIndex: 'storeName' },
          { title: '区域编码', dataIndex: 'areaCode' },
          { title: '区域名称', dataIndex: 'areaName' },
          { title: '商品编码', dataIndex: 'prodCode' },
          { title: '商品名称', dataIndex: 'prodName' },
          { title: '商品数量', dataIndex: 'prodNum' },
          { title: '商品单位', dataIndex: 'prodUnit' },
          { title: '更新人', dataIndex: 'lastModifiedBy' },
          { title: '更新时间', dataIndex: 'lastModifiedDate' },
          { title: '详情', dataIndex: 'id', slots: { customRender: 'action' } },
        ],
      }
    },
    beforeMount() {
      this.queryData()
    },
    methods: {
      ...mapMutations({
        pageInfo: 'appStore/storeProd/pageInfo',
        currentData: 'appStore/storeProd/currentData',
      }),
      ...mapActions({
        queryPage: 'appStore/storeProd/queryPage',
        exportData: 'appStore/storeProd/exportData',
      }),
      initQueryData() {
        this.pageInfo()
        this.$refs.refStoreProdParam.submit()
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
      queryDetail() {
        this.visible.detail = true
      },
    },
  }
</script>
