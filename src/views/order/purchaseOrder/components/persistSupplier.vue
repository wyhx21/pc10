<template>
  <div class="order-persist">
    <div class="order-persist_header">
      <a-row align="middle">
        <a-col :span="3">
          <span>供应商编码:</span>
        </a-col>
        <a-col :span="4">
          <a-input
            :value="supplierCode"
            @update:value="setSupplierCode"
            placeholder="供应商编码"
          />
        </a-col>
        <a-col :span="3">
          <span>供应商名称:</span>
        </a-col>
        <a-col :span="4">
          <a-input
            :value="supplierName"
            @update:value="setSupplierName"
            placeholder="供应商名称"
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
        :data-source="supplierList"
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
        supplier: 'appOrder/purchaseOrder/persist/supplier',
        supplierCode: 'appOrder/purchaseOrder/persist/param1',
        supplierName: 'appOrder/purchaseOrder/persist/param2',
        supplierList: 'appOrder/purchaseOrder/persist/supplierList',
      }),
    },
    watch: {
      supplier: {
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
            title: '供应商编码',
            dataIndex: 'supplierCode',
            width: 120,
            slots: { customRender: 'choose' },
          },
          {
            title: '供应商名称',
            dataIndex: 'supplierName',
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
        setSupplierCode: 'appOrder/purchaseOrder/persist/setParam1',
        setSupplierName: 'appOrder/purchaseOrder/persist/setParam2',
        setPageInfo: 'appOrder/purchaseOrder/persist/setPageInfo',
        setSupplierInfo: 'appOrder/purchaseOrder/persist/setSupplier',
        toPage: 'appOrder/purchaseOrder/persist/toPage',
      }),
      ...mapActions({
        querySupplier: 'appOrder/purchaseOrder/persist/querySupplier',
      }),
      initQuery() {
        this.setPageInfo()
        this.querySupplier()
      },
      resetParam() {
        const key = this.supplier?.id
        if (key) {
          this.selectedRowKeys = [key]
        } else {
          this.selectedRowKeys = []
        }
        this.setSupplierCode()
        this.setSupplierName()
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
        const [sup] = this.supplierList.filter((item) => item['id'] == key)
        if (!sup) {
          Message({ message: '请选择一条记录', type: 'warning' })
          return
        }
        if (this.supplier['id'] == key) {
          this.toPage('AppMain')
          return
        }
        Object.assign(sup, {
          extraAmount: 0,
          remark: '',
        })
        this.setSupplierInfo(sup)
        this.toPage('AppMain')
      },
    },
  }
</script>
