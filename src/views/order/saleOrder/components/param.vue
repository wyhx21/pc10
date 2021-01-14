<template>
  <a-form layout="inline" :model="params" class="app-param-form_2">
    <a-form-item label="订单状态">
      <a-select v-model:value="params.orderStatus" placeholder="订单状态">
        <a-select-option value="">全部</a-select-option>
        <a-select-option value="0">创建</a-select-option>
        <a-select-option value="1">生效</a-select-option>
        <a-select-option value="2">交易</a-select-option>
        <a-select-option value="3">出库</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="客户编码">
      <a-input v-model:value="params.cusCode" placeholder="客户编码" />
    </a-form-item>
    <a-form-item label="订单号">
      <a-input v-model:value="params.orderNo" placeholder="订单号" />
    </a-form-item>
    <a-form-item label="订单金额" class="app-param-form-item_num">
      <a-input-number
        :precision="2"
        v-model:value="params.orderAmountMin"
        placeholder="订单金额最小值"
      />
      <span class="app-param-form-item_sep">~</span>
      <a-input-number
        :precision="2"
        v-model:value="params.orderAmountMax"
        placeholder="订单金额最大值"
      />
    </a-form-item>
    <a-form-item label="生效时间" class="app-param-form-item_range">
      <a-range-picker
        v-model:value="dataRange"
        :placeholder="['生效开始时间', '生效结束时间']"
        @change="onDataChange"
      >
        <template #suffixIcon><SmileOutlined /></template>
      </a-range-picker>
    </a-form-item>
  </a-form>
</template>
<script>
  import { mapMutations } from 'vuex'
  import { SmileOutlined } from '@ant-design/icons-vue'
  export default {
    components: {
      SmileOutlined,
    },
    data() {
      return {
        dataRange: [],
        params: {
          cusCode: '',
          orderAmountMax: '',
          orderAmountMin: '',
          orderNo: '',
          orderStatus: '',
          orderTimeBegin: '',
          orderTimeEnd: '',
        },
      }
    },
    methods: {
      ...mapMutations({
        queryParam: 'appOrder/saleOrder/queryParam',
      }),
      submit() {
        this.queryParam(this.params)
      },
      clean() {
        this.queryParam()
        this.dataRange = []
        this.params = {
          cusCode: '',
          orderAmountMax: '',
          orderAmountMin: '',
          orderNo: '',
          orderStatus: '',
          orderTimeBegin: '',
          orderTimeEnd: '',
        }
      },
      onDataChange(date, dateString) {
        this.params.orderTimeBegin = dateString[0]
        this.params.orderTimeEnd = dateString[1]
      },
    },
  }
</script>
