<template>
  <div class="order-persist">
    <div class="order-persist_header">
      <a-row align="middle">
        <a-col :span="3">
          <span>客户编码:</span>
        </a-col>
        <a-col :span="4">
          <a-input
            :value="cusCode"
            @update:value="setCusCode"
            placeholder="客户编码"
          />
        </a-col>
        <a-col :span="3">
          <span>客户名称:</span>
        </a-col>
        <a-col :span="4">
          <a-input
            :value="cusName"
            @update:value="setCusName"
            placeholder="客户名称"
          />
        </a-col>
        <a-col :span="2">
          <a-button size="small" type="primary" @click="initQuery">
            查询
          </a-button>
        </a-col>
        <a-col :span="2">
          <a-button size="small" type="primary" @click="submit">选择</a-button>
        </a-col>
        <a-col :span="2">
          <a-button size="small" @click="resetParam">重置</a-button>
        </a-col>
      </a-row>
    </div>
    <div class="order-persist_main">
      <a-table
        rowKey="id"
        :row-selection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange,
          type: 'radio',
        }"
        :columns="columns"
        :data-source="customerList"
        size="small"
        :pagination="false"
      >
        <template #choose="{ text, record }">
          <div @click="onSelectChange([record['id']])">{{ text }}</div>
        </template>
      </a-table>
    </div>
  </div>
</template>
<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  import { Message } from '@utils/messagerUtil.js'
  export default {
    computed: {
      ...mapGetters({
        customer: 'appOrder/saleOrder/persist/customer',
        cusCode: 'appOrder/saleOrder/persist/param1',
        cusName: 'appOrder/saleOrder/persist/param2',
        customerList: 'appOrder/saleOrder/persist/customerList',
      }),
    },
    watch: {
      customer: {
        handler(val) {
          const key = val?.id
          if (key) {
            this.selectedRowKeys = [key]
          }
        },
        immediate: true,
      },
    },
    data() {
      return {
        selectedRowKeys: [],
        columns: [
          {
            title: '客户编码',
            dataIndex: 'cusCode',
            width: 120,
            slots: { customRender: 'choose' },
          },
          {
            title: '客户名称',
            dataIndex: 'cusName',
            width: 120,
            slots: { customRender: 'choose' },
          },
          {
            title: '联系人',
            dataIndex: 'linkName',
            width: 120,
            slots: { customRender: 'choose' },
          },
          {
            title: '联系方式',
            dataIndex: 'mobile',
            width: 120,
            slots: { customRender: 'choose' },
          },
          {
            title: '地址',
            dataIndex: 'address',
            ellipsis: true,
            slots: { customRender: 'choose' },
          },
          {
            title: '备注',
            dataIndex: 'remark',
            ellipsis: true,
            slots: { customRender: 'choose' },
          },
        ],
      }
    },
    methods: {
      ...mapMutations({
        setCusCode: 'appOrder/saleOrder/persist/setParam1',
        setCusName: 'appOrder/saleOrder/persist/setParam2',
        setCustomerInfo: 'appOrder/saleOrder/persist/setCustomer',
        toPage: 'appOrder/saleOrder/persist/toPage',
      }),
      ...mapActions({
        initQuery: 'appOrder/saleOrder/persist/initQuery',
      }),
      resetParam() {
        const key = this.customer?.id
        if (key) {
          this.selectedRowKeys = [key]
        } else {
          this.selectedRowKeys = []
        }
        this.setCusCode()
        this.setCusName()
      },
      onSelectChange(selectedRowKeys) {
        this.selectedRowKeys = selectedRowKeys
      },
      submit() {
        const [key] = this.selectedRowKeys
        if (!key) {
          Message({ message: '请选择一条记录', type: 'warning' })
          return
        }
        const [cus] = this.customerList.filter((item) => item['id'] == key)
        if (!cus) {
          Message({ message: '请选择一条记录', type: 'warning' })
          return
        }
        if (this.customer['id'] == key) {
          this.toPage('AppMain')
          return
        }
        Object.assign(cus, {
          extraAmount: 0,
          remark: '',
        })
        this.setCustomerInfo(cus)
        this.toPage('AppMain')
      },
    },
  }
</script>
