<template>
  <app-container>
    <template #header>
      <table class="app-store-verify-detail-head">
        <tr>
          <td width="35%">
            <span>订单号:</span>
            <span>{{ currentData['orderNo'] }}</span>
          </td>
          <td width="35%">
            <span>仓库编码:</span>
            <span>{{ currentData['storeCode'] }}</span>
          </td>
          <td>
            <span>仓库名称:</span>
            <span>{{ currentData['storeName'] }}</span>
          </td>
        </tr>
        <tr>
          <td>
            <span>分类:</span>
            <span>{{ currentData['verifiValue'] }}</span>
          </td>
          <td>
            <span>订单状态:</span>
            <span>{{ currentData['verifiStatusValue'] }}</span>
          </td>
          <td>
            <span>更新时间:</span>
            <span>{{ currentData['lastModifiedDate'] }}</span>
          </td>
        </tr>
      </table>
    </template>

    <a-table
      rowKey="id"
      :columns="columns"
      :data-source="dataList"
      size="small"
      :pagination="false"
    >
      <template #area="{ record }">
        <span>{{ record['areaName'] }}</span>
        <span>({{ record['areaCode'] }})</span>
      </template>
      <template #prod="{ record }">
        <span>{{ record['prodName'] }}</span>
        <span>({{ record['prodCode'] }})</span>
      </template>
      <template #num="{ record, text }">
        <span>{{ text }}</span>
        <span>({{ record['prodUnit'] }})</span>
      </template>
      <template #action="{ record }">
        <span>{{ record['lastModifiedBy'] }}</span>
        <span>({{ record['lastModifiedDate'] }})</span>
      </template>
    </a-table>

    <template #footer>
      <a-button class="app-modal-footer-button" size="small" @click="onCancel">
        取消
      </a-button>
      <a-popconfirm
        title="确认删除该记录?"
        ok-text="确认"
        cancel-text="取消"
        v-if="
          perDelete &&
          (currentData['verifiStatus'] == 0 || currentData['verifiStatus'] == 2)
        "
        @confirm="onDelete"
      >
        <a-button
          class="app-modal-footer-button"
          type="primary"
          size="small"
          :loading="loading.delete"
        >
          删除
        </a-button>
      </a-popconfirm>
      <a-popconfirm
        title="确认提交该记录?"
        ok-text="确认"
        cancel-text="取消"
        v-if="perConfirm && currentData['verifiStatus'] == 0"
        @confirm="onConfirm"
      >
        <a-button
          class="app-modal-footer-button"
          type="primary"
          size="small"
          :loading="loading.confrim"
        >
          确认
        </a-button>
      </a-popconfirm>
    </template>
  </app-container>
</template>
<script>
  import AppContainer from '@com/flexContainer'
  import { mapGetters, mapActions } from 'vuex'
  export default {
    components: {
      AppContainer,
    },
    computed: {
      ...mapGetters({
        dataList: 'appStore/storeVerify/detailList',
        currentData: 'appStore/storeVerify/currentData',
        perDelete: 'appStore/storeVerify/perDelete',
        perConfirm: 'appStore/storeVerify/perConfirm',
      }),
    },
    data() {
      return {
        loading: {
          delete: false,
          confrim: false,
        },
        currentRow: {},
        columns: [
          {
            title: '仓库区域',
            dataIndex: 'areaCode',
            slots: { customRender: 'area' },
          },
          {
            title: '核销商品',
            dataIndex: 'prodCode',
            slots: { customRender: 'prod' },
          },
          {
            title: '核销类型',
            dataIndex: 'verifiType',
          },
          {
            title: '核销数量',
            dataIndex: 'prodNum',
            slots: { customRender: 'num' },
          },
          {
            title: '改变数量',
            dataIndex: 'changeNum',
            slots: { customRender: 'num' },
          },
          {
            title: '备注',
            dataIndex: 'remark',
            ellipsis: true,
          },
          {
            title: '创建信息',
            dataIndex: 'lastModifiedBy',
            slots: { customRender: 'action' },
            ellipsis: true,
          },
        ],
      }
    },
    methods: {
      ...mapActions({
        deleteRecord: 'appStore/storeVerify/deleteRecord',
        confirmRecord: 'appStore/storeVerify/confirmRecord',
      }),
      onCancel() {
        this.$emit('cancel', false)
      },
      refresh() {
        this.$emit('refresh', true)
      },
      onDelete() {
        this.loading.delete = true
        this.deleteRecord()
          .then(() => {
            this.loading.delete = false
            this.refresh()
          })
          .catch(() => {
            this.loading.delete = false
          })
      },
      onConfirm() {
        this.loading.confrim = true
        this.confirmRecord()
          .then(() => {
            this.loading.confrim = false
            this.refresh()
          })
          .catch(() => {
            this.loading.confrim = false
          })
      },
    },
  }
</script>
<style lang="scss">
  .app-store-verify-detail-head {
    width: calc(100% - 40px);
    margin: 20px 20px 5px;
  }
</style>
