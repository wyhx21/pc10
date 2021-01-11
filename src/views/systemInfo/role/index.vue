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
        <a @click="editRecord(record)" v-if="perMerge"><EditOutlined /></a>
        <a-divider
          type="vertical"
          v-if="
            perMerge &&
            perDelete &&
            record.roleType != 0 &&
            record.roleType != 1
          "
        />
        <a-popconfirm
          title="确认删除该记录新增？"
          ok-text="确认"
          cancel-text="取消"
          v-if="perDelete && record.roleType != 0 && record.roleType != 1"
          @confirm="deleteRecord(record)"
        >
          <a><DeleteOutlined /></a>
        </a-popconfirm>
      </template>
    </a-table>

    <template #footer>
      <app-pagination :total="totalPageSize" @change="onPageChange" />
    </template>
  </app-container>
</template>
<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  import AppContainer from '@com/container.vue'
  import AppPagination from '@com/pagination.vue'
  import {
    RedoOutlined,
    SearchOutlined,
    EditOutlined,
    DeleteOutlined,
  } from '@ant-design/icons-vue'
  export default {
    components: {
      AppContainer,
      AppPagination,
      RedoOutlined,
      SearchOutlined,
      EditOutlined,
      DeleteOutlined,
    },
    computed: {
      ...mapGetters({
        dataList: 'appSystemInfo/role/dataList',
        totalPageSize: 'appSystemInfo/role/totalPageSize',
        perMerge: 'appSystemInfo/role/perMerge',
        perDelete: 'appSystemInfo/role/perDelete',
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
        },
        columns: [
          { title: '角色编码', dataIndex: 'roleCode', width: 150 },
          { title: '角色名称', dataIndex: 'roleName', width: 150 },
          { title: '角色类型', dataIndex: 'roleTypeValue', width: 150 },
          { title: '状态', dataIndex: 'enable', width: 150 },
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
      }),
      ...mapActions({
        queryPage: 'appSystemInfo/role/queryPage',
        dataDelete: 'appSystemInfo/role/dataDelete',
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
      editRecord() {},
      deleteRecord({ id }) {
        this.dataDelete(id)
      },
      onPageChange(page, size) {
        this.pageInfo({ page, size })
        this.queryData()
      },
    },
  }
</script>
