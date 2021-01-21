<template>
  <app-container>
    <template #param>
      <a-form layout="inline" :model="params">
        <a-form-item label="消息类型">
          <a-select v-model:value="params.msgType" placeholder="消息类型">
            <a-select-option value="">全部</a-select-option>
            <a-select-option value="1">轮播</a-select-option>
            <a-select-option value="2">消息</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="消息标题">
          <a-input v-model:value="params.title" placeholder="消息标题" />
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
      <template #time="{ record }">
        <span>{{ record['beginTime'] }}</span>
        <span>~</span>
        <span>{{ record['endTime'] }}</span>
      </template>
      <template #action="{ record }">
        <a @click="editRecord(record)" v-if="perMerge"><EditOutlined /></a>
        <a-divider type="vertical" v-if="perMerge && perDelete" />
        <a-popconfirm
          title="确认删除该记录？"
          ok-text="确认"
          cancel-text="取消"
          v-if="perDelete"
          @confirm="deleteRecord(record)"
        >
          <a><DeleteOutlined /></a>
        </a-popconfirm>
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
      title="消息编辑"
      width="400px"
      height="420px"
      @confirm="confirmMerge"
    >
      <app-edit ref="refSystemMsgEdit" />
    </app-modal>
    <!-- 商品类型修改 end -->

    <!-- 商品类型新增 begin -->
    <app-modal
      v-model:visible="visible.persist"
      title="消息新增"
      width="400px"
      height="420px"
      @confirm="confirmPersist"
    >
      <app-persist ref="refSystemMsgPersist" />
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
  import AppEdit from './components/msgEdit'
  import AppPersist from './components/msgPersist'
  import {
    RedoOutlined,
    SearchOutlined,
    EditOutlined,
    PlusCircleOutlined,
    DeleteOutlined,
  } from '@ant-design/icons-vue'
  export default {
    components: {
      SearchOutlined,
      EditOutlined,
      DeleteOutlined,
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
        dataList: 'appSystemMsg/mainMsg/dataList',
        perPersist: 'appSystemMsg/mainMsg/perPersist',
        perMerge: 'appSystemMsg/mainMsg/perMerge',
        perDelete: 'appSystemMsg/mainMsg/perDelete',
        totalPageSize: 'appSystemMsg/mainMsg/totalPageSize',
        currentPage: 'appSystemMsg/mainMsg/pageInfo',
      }),
      tableColumns() {
        if (this.perMerge || this.perDelete) {
          return this.columns
        } else {
          return this.columns.filter((item) => item['dataIndex'] != 'id')
        }
      },
    },
    data() {
      return {
        params: {
          msgType: '',
          title: '',
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
          { title: '标题', dataIndex: 'title', width: 120 },
          { title: '消息类型', dataIndex: 'msgTypeValue', width: 100 },
          { title: '排序', dataIndex: 'msgSort', width: 100 },
          { title: '链接', dataIndex: 'msgLink', width: 120 },
          {
            title: '状态',
            dataIndex: 'deleted',
            width: 100,
            slots: { customRender: 'deleted' },
          },
          { title: '内容', dataIndex: 'content', ellipsis: true },
          {
            title: '生效时间',
            dataIndex: 'id',
            slots: { customRender: 'time' },
            width: 200,
          },
          { title: '更新人', dataIndex: 'lastModifiedBy', width: 100 },
          { title: '更新时间', dataIndex: 'lastModifiedDate', width: 160 },
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
        pageInfo: 'appSystemMsg/mainMsg/pageInfo',
        queryParam: 'appSystemMsg/mainMsg/queryParam',
        currentData: 'appSystemMsg/mainMsg/currentData',
      }),
      ...mapActions({
        queryPage: 'appSystemMsg/mainMsg/queryPage',
        dataMerge: 'appSystemMsg/mainMsg/dataMerge',
        dataPersist: 'appSystemMsg/mainMsg/dataPersist',
        dataDelete: 'appSystemMsg/mainMsg/dataDelete',
      }),
      resetParam() {
        this.params = {
          msgType: '',
          title: '',
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
        this.currentData({ id: 0, deleted: 0, msgSort: 100, msgType: 2 })
        this.visible.persist = true
      },
      editRecord(record) {
        this.currentData(record)
        this.visible.merge = true
      },
      confirmMerge() {
        this.$refs.refSystemMsgEdit.submit()
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
        this.$refs.refSystemMsgPersist.submit()
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
      deleteRecord(record) {
        this.dataDelete(record['id'])
          .then(() => {
            this.queryData()
          })
          .catch(() => {})
      },
    },
  }
</script>
