<template>
  <app-container>
    <a-table
      rowKey="id"
      :columns="columns"
      :data-source="detailList"
      size="small"
      :pagination="false"
    >
      <template #price="{ text }">
        <app-price :modelValue="text" />
      </template>
    </a-table>

    <template #footer>
      <a-button class="app-modal-footer-button" size="small" @click="cancel">
        退出
      </a-button>
      <a-popconfirm
        title="确认删除该订单信息"
        ok-text="确认"
        cancel-text="取消"
        @confirm="delteData"
        v-if="perDelete && currentDate['orderStatus'] == 0"
      >
        <a-button type="primary" size="small" class="app-modal-footer-button">
          删除
        </a-button>
      </a-popconfirm>
      <a-popconfirm
        title="确认提交该订单信息"
        ok-text="确认"
        cancel-text="取消"
        @confirm="submitData"
        v-if="perSubmit && currentDate['orderStatus'] == 0"
      >
        <a-button type="primary" size="small" class="app-modal-footer-button">
          提交
        </a-button>
      </a-popconfirm>
      <a-popconfirm
        title="确认交易该订单信息"
        ok-text="确认"
        cancel-text="取消"
        @confirm="transferData"
        v-if="perTransfer && currentDate['orderStatus'] == 1"
      >
        <a-button type="primary" size="small" class="app-modal-footer-button">
          交易
        </a-button>
      </a-popconfirm>
    </template>
  </app-container>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  import AppContainer from './detail'
  import AppPrice from '@com/fianceNum'
  export default {
    components: {
      AppContainer,
      AppPrice,
    },
    computed: {
      ...mapGetters({
        currentDate: 'appOrder/saleOrder/currentData',
        detailList: 'appOrder/saleOrder/detailList',
        perSubmit: 'appOrder/saleOrder/perSubmit',
        perTransfer: 'appOrder/saleOrder/perTransfer',
        perDelete: 'appOrder/saleOrder/perDelete',
      }),
    },
    data() {
      return {
        columns: [
          { title: '商品编码', dataIndex: 'prodCode', width: 100 },
          { title: '商品名称', dataIndex: 'prodName', width: 100 },
          { title: '单位', dataIndex: 'prodUnit', width: 100, align: 'center' },
          {
            title: '单价',
            dataIndex: 'prodPrice',
            width: 100,
            align: 'right',
            slots: { customRender: 'price' },
          },
          { title: '数量', dataIndex: 'prodNum', align: 'right', width: 100 },
          {
            title: '金额',
            dataIndex: 'prodAmount',
            width: 100,
            align: 'right',
            slots: { customRender: 'price' },
          },
          { title: '备注', dataIndex: 'remark', ellipsis: true },
        ],
      }
    },
    methods: {
      ...mapActions({
        deleteRecord: 'appOrder/saleOrder/deleteRecord',
        submitRecord: 'appOrder/saleOrder/submitRecord',
        transferRecord: 'appOrder/saleOrder/transferRecord',
      }),
      cancel() {
        this.$emit('cancel', false)
      },
      delteData() {
        this.deleteRecord()
          .then(() => {
            this.$emit('refresh')
          })
          .catch(() => {})
      },
      submitData() {
        this.submitRecord()
          .then(() => {
            this.$emit('refresh')
          })
          .catch(() => {})
      },
      transferData() {
        this.transferRecord()
          .then(() => {
            this.$emit('refresh')
          })
          .catch(() => {})
      },
    },
  }
</script>
