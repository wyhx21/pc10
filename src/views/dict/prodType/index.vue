<template>
  <app-container>
    <template #param>
      <a-form layout="inline" :model="params">
        <a-form-item label="商品类型编码">
          <a-input v-model:value="params.dicKey" placeholder="商品类型编码" />
        </a-form-item>
        <a-form-item label="商品类型名称">
          <a-input v-model:value="params.dicValue" placeholder="商品类型名称" />
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
        :current="currentPage"
        :total="totalPageSize"
        @change="onPageChange"
      />
    </template>

    <!-- 商品类型修改 begin -->
    <app-modal
      v-model:visible="visible.merge"
      title="商品类型编辑"
      width="400px"
      height="420px"
      @confirm="confirmMerge"
    >
      <app-edit ref="refProdTypeEdit" />
    </app-modal>
    <!-- 商品类型修改 end -->

    <!-- 商品类型新增 begin -->
    <app-modal
      v-model:visible="visible.persist"
      title="商品类型新增"
      width="400px"
      height="420px"
      @confirm="confirmPersist"
    >
      <app-persist ref="refProdTypePersist" />
    </app-modal>
    <!-- 商品类型新增 end -->
  </app-container>
</template>
<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  import AppContainer from '@com/container'
  import AppPagination from '@com/pagination'
  import AppSwitch from '@com/switch'
  import AppModal from '@com/modal'
  import AppEdit from './omponents/prodTypeEdit'
  import AppPersist from './omponents/prodTypePersist'
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
      AppSwitch,
      AppEdit,
      AppModal,
      AppPersist,
    },
    computed: {
      ...mapGetters({
        dataList: 'appDict/prodType/dataList',
        perPersist: 'appDict/prodType/perPersist',
        perMerge: 'appDict/prodType/perMerge',
        totalPageSize: 'appDict/prodType/totalPageSize',
        currentPage: 'appDict/prodType/pageInfo',
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
          dicKey: '',
          dicValue: '',
        },
        loading: {
          query: false,
          merge: false,
          persist: false,
        },
        visible: {
          merge: false,
          persist: false,
        },
        columns: [
          { title: '商品类型编码', dataIndex: 'dicKey', width: 150 },
          { title: '商品类型名称', dataIndex: 'dicValue', width: 150 },
          { title: '排序', dataIndex: 'dicSort', width: 150 },
          {
            title: '状态',
            dataIndex: 'deleted',
            width: 150,
            slots: { customRender: 'deleted' },
          },
          { title: '备注', dataIndex: 'remark', ellipsis: true },
          { title: '更新人', dataIndex: 'lastModifiedBy', width: 150 },
          { title: '更新时间', dataIndex: 'lastModifiedDate', width: 200 },
          {
            title: '操作',
            dataIndex: 'id',
            width: 100,
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
        pageInfo: 'appDict/prodType/pageInfo',
        queryParam: 'appDict/prodType/queryParam',
        currentData: 'appDict/prodType/currentData',
      }),
      ...mapActions({
        queryPage: 'appDict/prodType/queryPage',
        dataMerge: 'appDict/prodType/dataMerge',
        dataPersist: 'appDict/prodType/dataPersist',
      }),
      resetParam() {
        this.params = {
          dicKey: '',
          dicValue: '',
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
      persistRecord() {
        this.currentData({ id: 0, deleted: 0, dicSort: 0 })
        this.visible.persist = true
      },
      editRecord(record) {
        this.currentData(record)
        this.visible.merge = true
      },
      confirmMerge() {
        this.$refs.refProdTypeEdit.submit()
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
      confirmPersist() {
        this.$refs.refProdTypePersist.submit()
        this.loading.persist = true
        this.dataPersist()
          .then(() => {
            this.loading.persist = false
            this.visible.persist = false
            this.queryPage()
          })
          .catch(() => {
            this.loading.persist = false
          })
      },
    },
  }
</script>
