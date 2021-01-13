<template>
  <div>
    <a-table
      rowKey="id"
      :columns="areaTableColumns"
      :data-source="areaList"
      size="small"
      :pagination="false"
    >
      <template #deleted="{ text }">
        <app-switch :modelValue="text" disabled />
      </template>
      <template #action="{ record }">
        <a @click="editRecord(record)" v-if="perAreaMerge"><EditOutlined /></a>
      </template>
    </a-table>

    <!-- 仓库区域编辑 begin -->
    <app-modal
      title="仓库区域编辑"
      width="400px"
      height="360px"
      @confirm="confirmAreaMerge"
      v-model:visible="visible.areaMerge"
    >
      <app-area-merge ref="refStoreAreaMerge" />
    </app-modal>
    <!-- 仓库区域编辑 end -->
  </div>
</template>
<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  import AppSwitch from '@com/switch'
  import AppModal from '@com/modal'
  import AppAreaMerge from './areaMerge'
  import { EditOutlined } from '@ant-design/icons-vue'
  export default {
    components: {
      AppSwitch,
      EditOutlined,
      AppModal,
      AppAreaMerge,
    },
    props: {
      areaList: {
        default: [],
      },
      storeId: {
        default: 0,
      },
    },
    computed: {
      ...mapGetters({
        perAreaMerge: 'appStore/store/perAreaMerge',
      }),
      areaTableColumns() {
        if (this.perAreaMerge) {
          return this.areaColumns
        } else {
          return this.areaColumns.filter((item) => item['dataIndex'] != 'id')
        }
      },
    },
    data() {
      return {
        visible: {
          areaMerge: false,
        },
        areaColumns: [
          { title: '区域编码', dataIndex: 'areaCode' },
          { title: '区域名称', dataIndex: 'areaName' },
          {
            title: '状态',
            dataIndex: 'deleted',
            slots: { customRender: 'deleted' },
          },
          { title: '备注', dataIndex: 'remark', ellipsis: true },
          { title: '更新人', dataIndex: 'lastModifiedBy' },
          { title: '更新时间', dataIndex: 'lastModifiedDate', width: 160 },
          {
            title: '操作',
            dataIndex: 'id',
            width: 60,
            slots: { customRender: 'action' },
          },
        ],
      }
    },
    methods: {
      ...mapMutations({
        currentArea: 'appStore/store/currentArea',
      }),
      ...mapActions({
        storeAreaQuery: 'appStore/store/storeAreaQuery',
        storeAreaMerge: 'appStore/store/storeAreaMerge',
      }),
      editRecord(record) {
        this.currentArea(record)
        this.visible.areaMerge = true
      },
      confirmAreaMerge() {
        this.$refs.refStoreAreaMerge.submit()
        this.storeAreaMerge()
          .then(() => {
            this.visible.areaMerge = false
            this.storeAreaQuery({ id: this.storeId })
          })
          .catch(() => {})
      },
    },
  }
</script>
