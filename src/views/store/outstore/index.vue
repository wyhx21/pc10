<template>
  <app-container>
    <template #param>
      <a-form layout="inline" :model="params">
        <a-form-item label="订单号">
          <a-input v-model:value="params.orderNo" placeholder="订单号" />
        </a-form-item>
        <a-form-item label="客户编码">
          <a-input v-model:value="params.cusCode" placeholder="客户编码" />
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
        <a @click="editRecord(record)" v-if="perMerge"><PaperClipOutlined /></a>
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
      v-model:visible="visible.merge"
      :loading="loading.merge"
      title="订单出库"
      width="800px"
      height="450px"
      @confirm="confirmMerge"
    >
      <app-detail />
    </app-modal>
    <!-- 详情 end -->
  </app-container>
</template>
<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  import AppContainer from '@com/container'
  import AppPagination from '@com/pagination'
  import AppModal from '@com/modal'
  import AppDetail from './components/detail'
  import {
    RedoOutlined,
    SearchOutlined,
    PaperClipOutlined,
  } from '@ant-design/icons-vue'
  export default {
    components: {
      SearchOutlined,
      RedoOutlined,
      AppContainer,
      AppPagination,
      PaperClipOutlined,
      AppModal,
      AppDetail,
    },
    computed: {
      ...mapGetters({
        dataList: 'appStore/outstore/dataList',
        perMerge: 'appStore/outstore/perMerge',
        totalPageSize: 'appStore/outstore/totalPageSize',
        currentPage: 'appStore/outstore/pageInfo',
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
        params: {
          orderNo: '',
          cusCode: '',
        },
        loading: {
          query: false,
          merge: false,
        },
        visible: {
          merge: false,
        },
        columns: [
          { title: '订单号', dataIndex: 'orderNo', width: 200 },
          { title: '客户编码', dataIndex: 'cusCode' },
          { title: '客户名称', dataIndex: 'cusName' },
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
        pageInfo: 'appStore/outstore/pageInfo',
        queryParam: 'appStore/outstore/queryParam',
        currentData: 'appStore/outstore/currentData',
        setStoreId: 'appStore/outstore/storeId',
        clearArea: 'appStore/storeSelector/setStoreAreaList',
      }),
      ...mapActions({
        queryPage: 'appStore/outstore/queryPage',
        queryDetail: 'appStore/outstore/queryDetail',
        dataMerge: 'appStore/outstore/dataMerge',
      }),
      resetParam() {
        this.params = {
          orderNo: '',
          cusCode: '',
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
