<template>
  <app-container>
    <template #param>
      <a-form layout="inline" :model="params" class="app-param-form_2">
        <a-form-item label="供应商编码">
          <a-input v-model:value="params.cusCode" placeholder="供应商编码" />
        </a-form-item>
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
    >
      <template #price="{ text }">
        <app-price :modelValue="text" />
      </template>
    </a-table>

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
  import AppPrice from '@com/fianceNum'
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
      AppPrice,
    },
    computed: {
      ...mapGetters({
        dataList: 'appStatistics/purchaseOrder/dataList',
        perExport: 'appStatistics/purchaseOrder/perExport',
        totalPageSize: 'appStatistics/purchaseOrder/totalPageSize',
        currentPage: 'appStatistics/purchaseOrder/pageInfo',
      }),
    },
    data() {
      return {
        dataRange: [],
        params: {
          statisticBegin: '',
          statisticEnd: '',
          cusCode: '',
        },
        loading: {
          query: false,
          export: false,
        },
        columns: [
          { title: '供应商编码', dataIndex: 'supplierCode' },
          { title: '供应商名称', dataIndex: 'supplierName' },
          {
            title: '统计金额',
            dataIndex: 'orderAmount',
            slots: { customRender: 'price' },
          },
          {
            title: '额外金额',
            dataIndex: 'extraAmount',
            slots: { customRender: 'price' },
          },
          { title: '日期', dataIndex: 'statisticDay' },
        ],
      }
    },
    beforeMount() {
      this.queryData()
    },
    methods: {
      ...mapMutations({
        pageInfo: 'appStatistics/purchaseOrder/pageInfo',
        queryParam: 'appStatistics/purchaseOrder/queryParam',
      }),
      ...mapActions({
        queryPage: 'appStatistics/purchaseOrder/queryPage',
        exportData: 'appStatistics/purchaseOrder/exportData',
      }),
      resetParam() {
        this.params = {
          statisticBegin: '',
          statisticEnd: '',
          cusCode: '',
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
