<template>
  <app-container>
    <template #param>
      <a-form layout="inline" :model="params">
        <a-form-item label="系统编码">
          <a-input v-model:value="params.sysCode" placeholder="系统编码" />
        </a-form-item>
        <a-form-item label="系统名称">
          <a-input v-model:value="params.sysName" placeholder="系统名称" />
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
        :loading="loading.persist"
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
        @click="queryData"
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
        <a @click="editRecord(record)"><EditOutlined /></a>
      </template>
    </a-table>

    <!-- 系统编辑 begin -->
    <a-modal
      v-model:visible="model.visible"
      title="系统编辑"
      width="400px"
      :maskClosable="false"
    >
      <div style="height: 350px; overflow: auto">
        <component
          :ref="`refSystem${model.editComponent}`"
          :is="model.editComponent"
        />
      </div>
      <template #footer>
        <a-button
          size="small"
          type="primary"
          @click="confirmRowData"
          v-if="model.editComponent == 'AppEditor'"
        >
          菜单信息
        </a-button>
        <a-button
          size="small"
          type="primary"
          @click="model.editComponent = 'AppEditor'"
          v-if="model.editComponent == 'AppMenuEditor'"
        >
          系统信息
        </a-button>
        <a-popconfirm
          title="确认保存该记录？"
          ok-text="确认"
          cancel-text="取消"
          @confirm="confirmData"
          v-if="model.editComponent == 'AppMenuEditor'"
        >
          <a-button size="small" type="primary" :loading="loading.merge">
            确认
          </a-button>
        </a-popconfirm>
        <a-popconfirm
          title="确认取消该记录修改？"
          ok-text="确认"
          cancel-text="取消"
          @confirm="model.visible = false"
        >
          <a-button size="small">取消</a-button>
        </a-popconfirm>
      </template>
    </a-modal>
    <!-- 系统编辑 end -->
    <!-- 系统新增 begin -->
    <a-modal
      v-model:visible="persist.visible"
      title="系统新增"
      width="400px"
      :maskClosable="false"
    >
      <div style="height: 350px; overflow: auto">
        <component
          :ref="`refSystem${persist.persistComponent}`"
          :is="persist.persistComponent"
        />
      </div>
      <template #footer>
        <a-button
          size="small"
          type="primary"
          @click="confirmPersistSystem"
          v-if="persist.persistComponent == 'AppPersist'"
        >
          角色信息
        </a-button>
        <a-button
          size="small"
          type="primary"
          @click="toSystemPersist"
          v-if="persist.persistComponent == 'AppRolePersist'"
        >
          系统信息
        </a-button>
        <a-button
          size="small"
          type="primary"
          @click="toMenuPersist"
          v-if="persist.persistComponent == 'AppRolePersist'"
        >
          菜单信息
        </a-button>
        <a-button
          size="small"
          type="primary"
          @click="persist.persistComponent = 'AppRolePersist'"
          v-if="persist.persistComponent == 'AppMenuPersist'"
        >
          角色信息
        </a-button>

        <a-popconfirm
          title="确认添加该记录新增？"
          ok-text="确认"
          cancel-text="取消"
          v-if="persist.persistComponent == 'AppMenuPersist'"
          @confirm="confirmPersistData"
        >
          <a-button type="primary" size="small" :loading="loading.persist">
            确认新增
          </a-button>
        </a-popconfirm>

        <a-popconfirm
          title="确认取消该记录新增？"
          ok-text="确认"
          cancel-text="取消"
          @confirm="persist.visible = false"
        >
          <a-button size="small">取消</a-button>
        </a-popconfirm>
      </template>
    </a-modal>
    <!-- 系统新增 end -->
  </app-container>
</template>
<script>
  import AppContainer from '@com/container.vue'
  import {
    SearchOutlined,
    RedoOutlined,
    EditOutlined,
    PlusCircleOutlined,
  } from '@ant-design/icons-vue'
  import { mapGetters, mapActions, mapMutations } from 'vuex'
  import AppEditor from './components/systemEdit.vue'
  import AppMenuEditor from './components/systemMenuEditor.vue'
  import AppPersist from './components/systemPersist.vue'
  import AppRolePersist from './components/systemRolePersist.vue'
  import AppMenuPersist from './components/systemMenuPersist.vue'
  import AppSwitch from '@com/switch'
  export default {
    components: {
      AppContainer,
      SearchOutlined,
      RedoOutlined,
      AppEditor,
      AppMenuEditor,
      EditOutlined,
      PlusCircleOutlined,
      AppPersist,
      AppRolePersist,
      AppMenuPersist,
      AppSwitch,
    },
    computed: {
      ...mapGetters({
        dataList: 'appSystemInfo/system/dataList',
        perPersist: 'appSystemInfo/system/perPersist',
        perMerge: 'appSystemInfo/system/perMerge',
      }),
      tableColumns() {
        if (this.perMerge) {
          return this.columns
        } else {
          return this.columns.filter((item) => item['key'] != 'id')
        }
      },
    },
    data() {
      return {
        params: {
          sysCode: '',
          sysName: '',
        },
        loading: {
          query: false,
          merge: false,
          persist: false,
        },
        model: {
          visible: false,
          editComponent: '',
        },
        persist: {
          visible: false,
          persistComponent: '',
        },
        columns: [
          {
            title: '系统编码',
            key: 'sysCode',
            dataIndex: 'sysCode',
            width: 150,
          },
          {
            title: '系统名称',
            key: 'sysName',
            dataIndex: 'sysName',
            width: 150,
          },
          {
            title: '状态',
            key: 'deleted',
            dataIndex: 'deleted',
            width: 150,
            slots: { customRender: 'deleted' },
          },
          {
            title: '备注',
            key: 'remark',
            dataIndex: 'remark',
            ellipsis: true,
          },
          {
            title: '更新人',
            key: 'lastModifiedBy',
            dataIndex: 'lastModifiedBy',
            width: 150,
          },
          {
            title: '更新时间',
            key: 'lastModifiedDate',
            width: 200,
            dataIndex: 'lastModifiedDate',
          },
          {
            title: '操作',
            key: 'id',
            dataIndex: 'id',
            width: 100,
            slots: { customRender: 'action' },
          },
        ],
      }
    },
    mounted() {
      this.queryData()
    },
    methods: {
      ...mapActions({
        queryPage: 'appSystemInfo/system/queryPage',
        mergeRecode: 'appSystemInfo/system/mergeRecode',
        persistReocrd: 'appSystemInfo/system/persistReocrd',
      }),
      ...mapMutations({
        setParam: 'appSystemInfo/system/queryParam',
        setEditData: 'appSystemInfo/system/currentData',
        setRoleInfo: 'appSystemInfo/system/roleInfo',
      }),
      resetParam() {
        this.params = {
          sysCode: '',
          sysName: '',
        }
        this.setParam()
      },
      queryData() {
        this.loading.query = true
        this.setParam(this.params)
        this.queryPage()
          .then(() => {
            this.loading.query = false
          })
          .catch(() => {
            this.loading.query = false
          })
      },
      editRecord(val) {
        this.setEditData(val)
        this.model.editComponent = 'AppEditor'
        this.model.visible = true
      },
      persistRecord() {
        this.setEditData({ deleted: 0, id: 0 })
        this.setRoleInfo()
        this.persist.visible = true
        this.persist.persistComponent = 'AppPersist'
      },
      confirmPersistSystem() {
        this.$refs.refSystemAppPersist.submit()
        this.persist.persistComponent = 'AppRolePersist'
      },
      toSystemPersist() {
        this.$refs.refSystemAppRolePersist.submit()
        this.persist.persistComponent = 'AppPersist'
      },
      toMenuPersist() {
        this.$refs.refSystemAppRolePersist.submit()
        this.persist.persistComponent = 'AppMenuPersist'
      },
      confirmRowData() {
        this.$refs.refSystemAppEditor.submit()
        this.model.editComponent = 'AppMenuEditor'
      },
      confirmPersistData() {
        this.loading.persist = true
        this.persistReocrd()
          .then(() => {
            this.persist.visible = false
            this.loading.persist = false
            this.queryData()
          })
          .catch(() => {
            this.loading.persist = false
          })
      },
      confirmData() {
        this.loading.merge = true
        this.mergeRecode()
          .then(() => {
            this.model.visible = false
            this.loading.merge = false
            this.queryData()
          })
          .catch(() => {
            this.loading.merge = false
          })
      },
    },
  }
</script>
