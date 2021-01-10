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
      <a-button type="primary" @click="resetParam" size="small">
        <template #icon><RedoOutlined /></template>
        重置
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
      :columns="columns"
      :data-source="dataList"
      :loading="loading.query"
      size="small"
      :pagination="false"
    >
      <template #action="{ record }">
        <a @click="editRecord(record)">编辑</a>
      </template>
    </a-table>

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
          下一步
        </a-button>
        <a-button
          size="small"
          type="primary"
          @click="model.editComponent = 'AppEditor'"
          v-if="model.editComponent == 'AppMenuEditor'"
        >
          上一步
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
  </app-container>
</template>
<script>
  import AppContainer from '@com/container.vue'
  import { SearchOutlined, RedoOutlined } from '@ant-design/icons-vue'
  import { mapGetters, mapActions, mapMutations } from 'vuex'
  import AppEditor from './components/systemEdit.vue'
  import AppMenuEditor from './components/systemMenuEditor.vue'
  export default {
    computed: {
      ...mapGetters({
        dataList: 'appSystemInfo/system/dataList',
      }),
    },
    components: {
      AppContainer,
      SearchOutlined,
      RedoOutlined,
      AppEditor,
      AppMenuEditor,
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
        },
        model: {
          visible: false,
          editComponent: '',
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
          { title: '状态', key: 'enable', dataIndex: 'enable', width: 150 },
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
            width: 50,
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
      }),
      ...mapMutations({
        setParam: 'appSystemInfo/system/queryParam',
        setEditData: 'appSystemInfo/system/currentData',
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
      confirmRowData() {
        this.$refs.refSystemAppEditor.submit()
        this.model.editComponent = 'AppMenuEditor'
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
