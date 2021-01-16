<template>
  <app-container>
    <template #header>
      <table class="app-store-dispatch-detail-head">
        <tr>
          <td width="35%">
            <span>订单号:</span>
            <span>{{ currentData['orderNo'] }}</span>
          </td>
          <td width="35%">
            <span>调出仓库:</span>
            <span>
              {{ currentData['storeName'] }}({{ currentData['storeCode'] }})
            </span>
          </td>
          <td>
            <span>更新人:</span>
            <span>{{ currentData['lastModifiedBy'] }}</span>
          </td>
        </tr>
        <tr>
          <td>
            <span>更新时间:</span>
            <span>{{ currentData['lastModifiedDate'] }}</span>
          </td>
          <td>
            <span>调入仓库:</span>
            <span>
              {{ currentData['toStoreName'] }}({{ currentData['toStoreCode'] }})
            </span>
          </td>
          <td>
            <span>状态:</span>
            <span>{{ currentData['disPacherStatusValue'] }}</span>
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
      <template #sourceArea="{ record }">
        <span>{{ record['areaName'] }}</span>
        <span>({{ record['areaCode'] }})</span>
      </template>
      <template #toArea="{ record }">
        <span>{{ record['toAreaName'] }}</span>
        <span>({{ record['toAreaCode'] }})</span>
      </template>
      <template #prod="{ record }">
        <span>{{ record['prodName'] }}</span>
        <span>({{ record['prodCode'] }})</span>
      </template>
      <template #num="{ record }">
        <span>{{ record['prodNum'] }}</span>
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
        v-if="perDelete && currentData['disPacherStatus'] == 0"
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
        v-if="perMerge && currentData['disPacherStatus'] == 0"
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
        dataList: 'appStore/storeDispatch/detailList',
        currentData: 'appStore/storeDispatch/currentData',
        perDelete: 'appStore/storeDispatch/perDelete',
        perMerge: 'appStore/storeDispatch/perMerge',
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
            title: '调出仓库区域',
            dataIndex: 'areaCode',
            slots: { customRender: 'sourceArea' },
          },
          {
            title: '调度商品信息',
            dataIndex: 'prodCode',
            slots: { customRender: 'prod' },
          },
          {
            title: '调度商品数量',
            dataIndex: 'id',
            slots: { customRender: 'num' },
          },
          {
            title: '调入仓库区域',
            dataIndex: 'toAreaCode',
            slots: { customRender: 'toArea' },
          },
          {
            title: '操作信息',
            dataIndex: 'lastModifiedBy',
            slots: { customRender: 'action' },
          },
        ],
      }
    },
    methods: {
      ...mapActions({
        deleteRecord: 'appStore/storeDispatch/deleteRecord',
        confirmRecord: 'appStore/storeDispatch/confirmRecord',
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
  .app-store-dispatch-detail-head {
    width: calc(100% - 40px);
    margin: 20px 20px 5px;
  }
</style>
