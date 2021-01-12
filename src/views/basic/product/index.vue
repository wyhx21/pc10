<template>
  <app-container>
    <template #param>
      <app-param ref="refProductParam" />
    </template>

    <template #query>
      <a-button @click="$refs.refProductParam.clean()" size="small">
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
    >
      <template #price="{ text }">
        <app-price :modelValue="text" />
      </template>
      <template #deleted="{ text }">
        <app-switch :modelValue="text" disabled />
      </template>
      <template #action="{ record }">
        <a @click="editRecord(record)" v-if="perMerge"><EditOutlined /></a>
      </template>
    </a-table>

    <template #footer>
      <app-pagination :total="totalPageSize" @change="onPageChange" />
    </template>

    <!-- 商品编辑 begin -->
    <app-modal
      title="商品编辑"
      width="400px"
      height="420px"
      @confirm="confirmMerge"
      v-model:visible="visible.merge"
    >
      <app-edit ref="refProductEdit" />
    </app-modal>
    <!-- 商品编辑 end -->

    <!-- 商品新增 begin -->
    <app-modal
      title="商品新增"
      width="400px"
      height="420px"
      @confirm="confirmPersist"
      v-model:visible="visible.persist"
    >
      <app-persist ref="refProductPersist" />
    </app-modal>
    <!-- 商品新增 end -->
  </app-container>
</template>
<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  import AppParam from './components/param'
  import AppContainer from '@com/container'
  import AppPagination from '@com/pagination'
  import AppSwitch from '@com/switch'
  import AppModal from '@com/modal'
  import AppPrice from '@com/fianceNum'
  import AppEdit from './components/productEdit'
  import AppPersist from './components/productPersist'
  import {
    RedoOutlined,
    SearchOutlined,
    EditOutlined,
    PlusCircleOutlined,
  } from '@ant-design/icons-vue'
  export default {
    components: {
      AppParam,
      SearchOutlined,
      EditOutlined,
      PlusCircleOutlined,
      RedoOutlined,
      AppContainer,
      AppPagination,
      AppSwitch,
      AppModal,
      AppPrice,
      AppEdit,
      AppPersist,
    },
    computed: {
      ...mapGetters({
        dataList: 'appBasic/product/dataList',
        perPersist: 'appBasic/product/perPersist',
        perMerge: 'appBasic/product/perMerge',
        totalPageSize: 'appBasic/product/totalPageSize',
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
        },
        visible: {
          merge: false,
          persist: false,
        },
        columns: [
          { title: '商品编码', dataIndex: 'prodCode', width: 120 },
          { title: '商品名称', dataIndex: 'prodName', width: 120 },
          { title: '类型', dataIndex: 'prodTypeName', width: 100 },
          {
            title: '采购单价',
            dataIndex: 'purchPrice',
            width: 100,
            align: 'right',
            slots: { customRender: 'price' },
          },
          {
            title: '销售单价',
            dataIndex: 'salePrice',
            width: 100,
            align: 'right',
            slots: { customRender: 'price' },
          },
          { title: '单位', dataIndex: 'prodUnit', width: 100, align: 'center' },
          {
            title: '状态',
            dataIndex: 'deleted',
            width: 100,
            slots: { customRender: 'deleted' },
          },
          { title: '备注', dataIndex: 'remark', ellipsis: true },
          { title: '更新人', dataIndex: 'lastModifiedBy', width: 100 },
          { title: '更新时间', dataIndex: 'lastModifiedDate', width: 200 },
          {
            title: '操作',
            dataIndex: 'id',
            width: 80,
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
        pageInfo: 'appBasic/product/pageInfo',
        currentData: 'appBasic/product/currentData',
      }),
      ...mapActions({
        queryPage: 'appBasic/product/queryPage',
        dataMerge: 'appBasic/product/dataMerge',
        dataPersist: 'appBasic/product/dataPersist',
      }),
      initQueryData() {
        this.pageInfo()
        this.$refs.refProductParam.submit()
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
        this.$refs.refProductEdit.submit()
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
        this.$refs.refProductPersist.submit()
        this.dataPersist()
          .then(() => {
            this.visible.persist = false
            this.queryData()
          })
          .catch(() => {})
      },
    },
  }
</script>
