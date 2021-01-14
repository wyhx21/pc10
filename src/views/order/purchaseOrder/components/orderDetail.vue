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
      <a-button size="small" @click="cancel">退出</a-button>
      <a-button
        type="primary"
        size="small"
        v-if="perDelete && currentDate['orderStatus'] == 0"
        @click="delteData"
      >
        删除
      </a-button>
      <a-button
        type="primary"
        size="small"
        v-if="perSubmit && currentDate['orderStatus'] == 0"
        @click="submitData"
      >
        提交
      </a-button>
      <a-button
        type="primary"
        size="small"
        v-if="perTransfer && currentDate['orderStatus'] == 1"
        @click="transferData"
      >
        交易
      </a-button>
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
        currentDate: 'appOrder/purchaseOrder/currentData',
        detailList: 'appOrder/purchaseOrder/detailList',
        perSubmit: 'appOrder/purchaseOrder/perSubmit',
        perTransfer: 'appOrder/purchaseOrder/perTransfer',
        perDelete: 'appOrder/purchaseOrder/perDelete',
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
        deleteRecord: 'appOrder/purchaseOrder/deleteRecord',
        submitRecord: 'appOrder/purchaseOrder/submitRecord',
        transferRecord: 'appOrder/purchaseOrder/transferRecord',
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
