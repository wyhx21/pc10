<template>
  <app-container>
    <template #param>
      <a-form layout="inline" :model="params">
        <a-form-item label="角色编码">
          <a-input v-model:value="params.roleCode" placeholder="角色编码" />
        </a-form-item>
        <a-form-item label="角色名称">
          <a-input v-model:value="params.roleName" placeholder="角色名称" />
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
        <a-divider
          type="vertical"
          v-if="perMerge && perDelete && record.roleType == 2"
        />
        <a-popconfirm
          title="确认删除该记录？"
          ok-text="确认"
          cancel-text="取消"
          v-if="perDelete && record.roleType == 2"
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

    <!-- 系统编辑 begin -->
    <a-modal
      v-model:visible="merge.visible"
      title="角色编辑"
      width="400px"
      :maskClosable="false"
    >
      <div style="height: 420px; overflow: auto">
        <component :ref="`refRole${merge.component}`" :is="merge.component" />
      </div>

      <template #footer>
        <a-button
          size="small"
          type="primary"
          @click="confirmRowData"
          v-if="merge.component == 'AppEdit'"
        >
          菜单信息
        </a-button>
        <a-button
          size="small"
          type="primary"
          @click="merge.component = 'AppEdit'"
          v-if="merge.component == 'AppMenuEdit'"
        >
          角色信息
        </a-button>
        <a-popconfirm
          title="确认保存该记录？"
          ok-text="确认"
          cancel-text="取消"
          v-if="merge.component == 'AppMenuEdit'"
          @confirm="confirmMergeData"
        >
          <a-button type="primary" size="small" :loading="loading.merge">
            确认修改
          </a-button>
        </a-popconfirm>
        <a-popconfirm
          title="确认取消该记录修改？"
          ok-text="确认"
          cancel-text="取消"
          @confirm="merge.visible = false"
        >
          <a-button size="small">取消</a-button>
        </a-popconfirm>
      </template>
    </a-modal>
    <!-- 系统编辑 end -->

    <!-- 角色新增 begin -->
    <a-modal
      v-model:visible="persist.visible"
      title="角色新增"
      width="400px"
      :maskClosable="false"
    >
      <div style="height: 420px; overflow: auto">
        <component
          :ref="`refRole${persist.component}`"
          :is="persist.component"
        />
      </div>

      <template #footer>
        <a-button
          size="small"
          type="primary"
          @click="confirmRecord"
          v-if="persist.component == 'AppPersist'"
        >
          菜单信息
        </a-button>
        <a-button
          size="small"
          type="primary"
          @click="persist.component = 'AppPersist'"
          v-if="persist.component == 'AppMenuPersist'"
        >
          角色信息
        </a-button>
        <a-popconfirm
          title="确认添加该角色信息？"
          ok-text="确认"
          cancel-text="取消"
          v-if="persist.component == 'AppMenuPersist'"
          @confirm="submitRecord"
        >
          <a-button type="primary" size="small" :loading="loading.persist">
            确认添加
          </a-button>
        </a-popconfirm>
        <a-popconfirm
          title="确认取消该记录添加？"
          ok-text="确认"
          cancel-text="取消"
          @confirm="persist.visible = false"
        >
          <a-button size="small">取消</a-button>
        </a-popconfirm>
      </template>
    </a-modal>
    <!-- 角色新增 end -->
  </app-container>
</template>
<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  import AppContainer from '@com/container'
  import AppPagination from '@com/pagination'
  import AppEdit from './components/RoleEdit'
  import AppSwitch from '@com/switch'
  import AppMenuEdit from './components/RoleMenuEdit'
  import AppPersist from './components/RolePersist'
  import AppMenuPersist from './components/RoleMenuPersist'
  import {
    RedoOutlined,
    SearchOutlined,
    EditOutlined,
    DeleteOutlined,
    PlusCircleOutlined,
  } from '@ant-design/icons-vue'
  export default {
    components: {
      AppContainer,
      AppPagination,
      RedoOutlined,
      SearchOutlined,
      EditOutlined,
      DeleteOutlined,
      PlusCircleOutlined,
      AppEdit,
      AppSwitch,
      AppMenuEdit,
      AppPersist,
      AppMenuPersist,
    },
    computed: {
      ...mapGetters({
        dataList: 'appSystemInfo/role/dataList',
        totalPageSize: 'appSystemInfo/role/totalPageSize',
        perMerge: 'appSystemInfo/role/perMerge',
        perDelete: 'appSystemInfo/role/perDelete',
        perPersist: 'appSystemInfo/role/perPersist',
        currentPage: 'appSystemInfo/role/pageInfo',
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
        page: {
          currentPage: 1,
          pageSize: 10,
        },
        params: {
          roleCode: '',
          roleName: '',
        },
        loading: {
          query: false,
          merge: false,
          persist: false,
        },
        merge: {
          visible: false,
          component: '',
        },
        persist: {
          visible: false,
          component: '',
        },
        columns: [
          { title: '角色编码', dataIndex: 'roleCode', width: 150 },
          { title: '角色名称', dataIndex: 'roleName', width: 150 },
          { title: '角色类型', dataIndex: 'roleTypeValue', width: 150 },
          {
            title: '状态',
            dataIndex: 'deleted',
            width: 150,
            slots: { customRender: 'deleted' },
          },
          { title: '备注信息', dataIndex: 'remark', ellipsis: true },
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
        pageInfo: 'appSystemInfo/role/pageInfo',
        queryParam: 'appSystemInfo/role/queryParam',
        currentData: 'appSystemInfo/role/currentData',
      }),
      ...mapActions({
        queryPage: 'appSystemInfo/role/queryPage',
        dataDelete: 'appSystemInfo/role/dataDelete',
        dataMerge: 'appSystemInfo/role/dataMerge',
        dataPersist: 'appSystemInfo/role/dataPersist',
      }),
      initQueryData() {
        this.pageInfo()
        this.queryParam(this.params)
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
      resetParam() {
        this.params = {
          roleCode: '',
          roleName: '',
        }
      },
      editRecord(record) {
        this.currentData(record)
        this.merge.component = 'AppEdit'
        this.merge.visible = true
      },
      deleteRecord({ id }) {
        this.dataDelete(id)
          .then(() => {
            this.queryData()
          })
          .catch(() => {})
      },
      onPageChange(page, size) {
        this.pageInfo({ page, size })
        this.queryData()
      },
      confirmRowData() {
        this.$refs.refRoleAppEdit.submit()
        this.merge.component = 'AppMenuEdit'
      },
      confirmMergeData() {
        this.loading.merge = true
        this.dataMerge()
          .then(() => {
            this.queryData()
            this.loading.merge = false
            this.merge.visible = false
          })
          .catch(() => {
            this.loading.merge = false
          })
      },
      persistRecord() {
        this.currentData({ deleted: 0, id: 0, roleTypeValue: '普通角色' })
        this.persist.visible = true
        this.persist.component = 'AppPersist'
      },
      confirmRecord() {
        this.$refs.refRoleAppPersist.submit()
        this.persist.component = 'AppMenuPersist'
      },
      submitRecord() {
        this.loading.persist = true
        this.dataPersist()
          .then(() => {
            this.queryData()
            this.loading.persist = false
            this.persist.visible = false
          })
          .catch(() => {
            this.loading.persist = false
          })
      },
    },
  }
</script>
