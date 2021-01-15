<template>
  <div class="order-persist">
    <div class="order-persist_header">
      <a-row align="middle">
        <a-col :span="3">
          <span>商品编码:</span>
        </a-col>
        <a-col :span="4">
          <a-input
            :value="productCode"
            @update:value="setProductCode"
            placeholder="商品编码"
          />
        </a-col>
        <a-col :span="3">
          <span>商品名称:</span>
        </a-col>
        <a-col :span="4">
          <a-input
            :value="productName"
            @update:value="setProductName"
            placeholder="商品名称"
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
        }"
        :columns="columns"
        :data-source="productList"
        size="small"
        :pagination="false"
      >
        <template #choose="{ text, record }">
          <div @click="onRowSelect(record['id'])">{{ text }}</div>
        </template>
        <template #price="{ text, record }">
          <div @click="onRowSelect(record['id'])">
            <app-price :modelValue="text" />
          </div>
        </template>
      </a-table>
    </div>
  </div>
</template>
<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  import AppPrice from '@com/fianceNum'
  export default {
    components: {
      AppPrice,
    },
    computed: {
      ...mapGetters({
        supplier: 'appOrder/purchaseOrder/persist/supplier',
        productCode: 'appOrder/purchaseOrder/persist/param1',
        productName: 'appOrder/purchaseOrder/persist/param2',
        productList: 'appOrder/purchaseOrder/persist/productList',
        orderProductList: 'appOrder/purchaseOrder/persist/orderProductList',
      }),
    },
    watch: {
      orderProductList: {
        handler(val) {
          this.selectedRowKeys = val.map((item) => item['id'])
        },
        immediate: true,
      },
    },
    data() {
      return {
        selectedRowKeys: [],
        columns: [
          {
            title: '商品编码',
            dataIndex: 'prodCode',
            width: 120,
            slots: { customRender: 'choose' },
          },
          {
            title: '商品名称',
            dataIndex: 'prodName',
            width: 120,
            slots: { customRender: 'choose' },
          },
          {
            title: '单位',
            dataIndex: 'prodUnit',
            width: 100,
            align: 'center',
            slots: { customRender: 'choose' },
          },
          {
            title: '建议单价',
            dataIndex: 'price',
            width: 100,
            align: 'right',
            slots: { customRender: 'price' },
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
        setProductCode: 'appOrder/purchaseOrder/persist/setParam1',
        setProductName: 'appOrder/purchaseOrder/persist/setParam2',
        setPageInfo: 'appOrder/purchaseOrder/persist/setPageInfo',
        setOrderProductList:
          'appOrder/purchaseOrder/persist/setOrderProductList',
        toPage: 'appOrder/purchaseOrder/persist/toPage',
      }),
      ...mapActions({
        queryProduct: 'appOrder/purchaseOrder/persist/queryProduct',
      }),
      initQuery() {
        this.setPageInfo()
        this.queryProduct()
      },
      resetParam() {
        this.selectedRowKeys = this.orderProductList.map((item) => item['id'])
        this.setProductCode()
        this.setProductName()
      },
      onRowSelect(id) {
        if (this.selectedRowKeys.includes(id)) {
          this.selectedRowKeys = this.selectedRowKeys.filter(
            (item) => item != id
          )
        } else {
          this.selectedRowKeys.push(id)
        }
      },
      onSelectChange(keys) {
        // 查询结果内没有的
        const ids = this.productList.map((item) => item['id'])
        const oldKeys = this.selectedRowKeys.filter(
          (item) => !ids.includes(item)
        )
        this.selectedRowKeys = [...keys, oldKeys]
      },
      submit() {
        // 原有的
        const oldIdList = this.orderProductList.map((item) => item['id'])
        // 已经选择的(原有的)
        const list2 = this.orderProductList.filter((item) =>
          this.selectedRowKeys.includes(item['id'])
        )
        // 已经选择的(新增的)
        const list3 = this.productList
          .filter((item) => this.selectedRowKeys.includes(item['id']))
          .filter((item) => !oldIdList.includes(item['id']))
        const res = [...list2, ...list3].sort((a, b) =>
          a['id'] > b['id'] ? 1 : -1
        )
        this.setOrderProductList(res)
        this.toPage('AppMain')
      },
    },
  }
</script>
