<template>
  <app-container>
    <template #param>
      <a-form layout="inline" :model="params">
        <a-form-item label="用户编码">
          <a-input v-model:value="params.userCode" placeholder="用户编码" />
        </a-form-item>
        <a-form-item label="用户名称">
          <a-input v-model:value="params.userName" placeholder="用户名称" />
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

    <!-- 用户编辑 begin -->
    <a-modal
      v-model:visible="merge.visible"
      title="用户编辑"
      width="400px"
      :maskClosable="false"
    >
      <div style="height: 350px; overflow: auto">
        <component :ref="`refUser${merge.component}`" :is="merge.component" />
      </div>

      <template #footer>
        <a-button
          size="small"
          type="primary"
          @click="confirmRowData"
          v-if="merge.component == 'AppUserEdit'"
        >
          角色信息
        </a-button>
        <a-button
          size="small"
          type="primary"
          @click="merge.component = 'AppUserEdit'"
          v-if="merge.component == 'AppUserRoleEdit'"
        >
          用户信息
        </a-button>
        <a-popconfirm
          title="确认保存该记录？"
          ok-text="确认"
          cancel-text="取消"
          v-if="merge.component == 'AppUserRoleEdit'"
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
    <!-- 用户编辑 end -->

    <!-- 用户新增 begin -->
    <a-modal
      v-model:visible="persist.visible"
      title="用户新增"
      width="400px"
      :maskClosable="false"
    >
      <div style="height: 350px; overflow: auto">
        <component
          :ref="`refUser${persist.component}`"
          :is="persist.component"
        />
      </div>

      <template #footer>
        <a-button
          size="small"
          type="primary"
          @click="persistRowData"
          v-if="persist.component == 'AppUserPersist'"
        >
          角色信息
        </a-button>
        <a-button
          size="small"
          type="primary"
          @click="persist.component = 'AppUserPersist'"
          v-if="persist.component == 'AppUserRolePersist'"
        >
          用户信息
        </a-button>
        <a-popconfirm
          title="确认添加该记录？"
          ok-text="确认"
          cancel-text="取消"
          v-if="persist.component == 'AppUserRolePersist'"
          @confirm="persistMergeData"
        >
          <a-button type="primary" size="small" :loading="loading.persist">
            确认修改
          </a-button>
        </a-popconfirm>
        <a-popconfirm
          title="确认取消添加该记录？"
          ok-text="确认"
          cancel-text="取消"
          @confirm="persist.visible = false"
        >
          <a-button size="small">取消</a-button>
        </a-popconfirm>
      </template>
    </a-modal>
    <!-- 用户新增 end -->
  </app-container>
</template>
<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  import AppContainer from '@com/container'
  import AppPagination from '@com/pagination'
  import AppSwitch from '@com/switch'
  import AppUserEdit from './components/userEdit'
  import AppUserRoleEdit from './components/userRoleEdit'
  import AppUserPersist from './components/userPersist'
  import AppUserRolePersist from './components/userRolePersist'
  import {
    RedoOutlined,
    SearchOutlined,
    EditOutlined,
    PlusCircleOutlined,
  } from '@ant-design/icons-vue'
  export default {
    components: {
      AppContainer,
      AppSwitch,
      AppPagination,
      RedoOutlined,
      PlusCircleOutlined,
      SearchOutlined,
      EditOutlined,
      AppUserEdit,
      AppUserRoleEdit,
      AppUserPersist,
      AppUserRolePersist,
    },
    computed: {
      ...mapGetters({
        dataList: 'appSystemInfo/user/dataList',
        perPersist: 'appSystemInfo/user/perPersist',
        perMerge: 'appSystemInfo/user/perMerge',
        totalPageSize: 'appSystemInfo/user/totalPageSize',
        currentPage: 'appSystemInfo/user/pageInfo',
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
          userCode: '',
          userName: '',
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
          { title: '用户编码', dataIndex: 'userCode' },
          { title: '用户名称', dataIndex: 'userName' },
          { title: '性别', dataIndex: 'sexValue' },
          {
            title: '状态',
            dataIndex: 'deleted',
            slots: { customRender: 'deleted' },
          },
          { title: '更新人', dataIndex: 'lastModifiedBy' },
          { title: '更新时间', dataIndex: 'lastModifiedDate' },
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
        pageInfo: 'appSystemInfo/user/pageInfo',
        queryParam: 'appSystemInfo/user/queryParam',
        currentData: 'appSystemInfo/user/currentData',
      }),
      ...mapActions({
        queryPage: 'appSystemInfo/user/queryPage',
        dataMerge: 'appSystemInfo/user/dataMerge',
        dataPersist: 'appSystemInfo/user/dataPersist',
      }),
      resetParam() {
        this.params = {
          userCode: '',
          userName: '',
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
      editRecord(data) {
        this.currentData(data)
        this.merge.component = 'AppUserEdit'
        this.merge.visible = true
      },
      confirmRowData() {
        this.$refs.refUserAppUserEdit.submit()
        this.merge.component = 'AppUserRoleEdit'
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
        this.currentData({ deleted: 0, id: 0, sex: 0 })
        this.persist.visible = true
        this.persist.component = 'AppUserPersist'
      },
      persistRowData() {
        this.$refs.refUserAppUserPersist.submit()
        this.persist.component = 'AppUserRolePersist'
      },
      persistMergeData() {
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
