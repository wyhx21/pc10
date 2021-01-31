<template>
  <app-container>
    <template #param>
      <a-form layout="inline" :model="params" class="app-param-form_2">
        <a-form-item label="统计日期" class="app-param-form-item_range">
          <a-range-picker
            v-model:value="dataRange"
            :placeholder="['统计开始时间', '统计结束时间']"
            @change="onDataChange"
          >
            <template #suffixIcon><SmileOutlined /></template>
          </a-range-picker>
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
      :columns="columns"
      :data-source="dataList"
      :loading="loading.query"
      size="small"
      :pagination="false"
    />

    <template #footer>
      <app-pagination
        :current="currentPage"
        :total="totalPageSize"
        @change="onPageChange"
      />
    </template>
  </app-container>
</template>
<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  import AppContainer from '@com/container'
  import AppPagination from '@com/pagination'
  import {
    RedoOutlined,
    SearchOutlined,
    SmileOutlined,
    FileExcelOutlined,
  } from '@ant-design/icons-vue'
  export default {
    components: {
      SearchOutlined,
      RedoOutlined,
      FileExcelOutlined,
      AppContainer,
      AppPagination,
      SmileOutlined,
    },
    computed: {
      ...mapGetters({
        dataList: 'appStatistics/saleOrderProduct/dataList',
        perExport: 'appStatistics/saleOrderProduct/perExport',
        totalPageSize: 'appStatistics/saleOrderProduct/totalPageSize',
        currentPage: 'appStatistics/saleOrderProduct/pageInfo',
      }),
    },
    data() {
      return {
        dataRange: [],
        params: {
          statisticBegin: '',
          statisticEnd: '',
        },
        loading: {
          query: false,
          export: false,
        },
        columns: [
          { title: '商品编码', dataIndex: 'prodCode' },
          { title: '商品名称', dataIndex: 'prodName' },
          { title: '商品单位', dataIndex: 'prodUnit' },
          { title: '商品数量', dataIndex: 'prodNum' },
          { title: '日期', dataIndex: 'statisticDay' },
        ],
      }
    },
    beforeMount() {
      this.queryData()
    },
    methods: {
      ...mapMutations({
        pageInfo: 'appStatistics/saleOrderProduct/pageInfo',
        queryParam: 'appStatistics/saleOrderProduct/queryParam',
      }),
      ...mapActions({
        queryPage: 'appStatistics/saleOrderProduct/queryPage',
        exportData: 'appStatistics/saleOrderProduct/exportData',
      }),
      resetParam() {
        this.params = {
          statisticBegin: '',
          statisticEnd: '',
        }
        this.dataRange = []
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
      onDataChange(date, dateString) {
        this.params.statisticBegin = dateString[0]
        this.params.statisticEnd = dateString[1]
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
    },
  }
</script>
