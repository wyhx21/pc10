<template>
  <a-row class="app-store-persist-main_row">
    <a-col :span="4">
      <a-select
        :value="data['areaId']"
        :key="data['keyIndex']"
        placeholder="选择区域"
        :style="style"
        size="small"
        @change="selectArea"
      >
        <a-select-option v-for="opt in storeAreaList" :key="opt['code']">
          {{ opt['value'] }}
        </a-select-option>
      </a-select>
    </a-col>
    <a-col :span="4">
      <a-select
        :value="data['storeProdId']"
        placeholder="选择商品"
        :key="data['keyIndex']"
        :style="style"
        size="small"
        :disabled="!data['areaId']"
        @change="selectProduct"
      >
        <a-select-option
          v-for="opt in data['prodList']"
          :key="opt['storeProdId']"
        >
          {{ opt['prodName'] }}
        </a-select-option>
      </a-select>
    </a-col>
    <a-col :span="3">
      <span>{{ data['storeNum'] }}</span>
    </a-col>
    <a-col :span="4">
      <a-select
        :value="data['verifiType']"
        size="small"
        :key="data['keyIndex']"
        :style="style"
        placeholder="核销类型"
        :disabled="!data['storeProdId']"
        @change="selectVerifyType"
      >
        <a-select-option value="0">总量</a-select-option>
        <a-select-option value="1">核增</a-select-option>
        <a-select-option value="2">核减</a-select-option>
      </a-select>
    </a-col>
    <a-col :span="3">
      <a-input-number
        :precision="2"
        :value="data['prodNum']"
        :style="style3"
        size="small"
        placeholder="核销数量"
        @update:value="updateProdNum"
        allow-clear
        :disabled="!data['verifiType']"
      />
    </a-col>
    <a-col :span="5">
      <a-input
        :value="data['remark']"
        size="small"
        placeholder="备注信息"
        @update:value="updateRemark"
        allow-clear
        :disabled="!data['prodNum']"
      />
    </a-col>
    <a-col :span="1">
      <a @click="deleteRecord(data['detailId'])"><DeleteOutlined /></a>
    </a-col>
  </a-row>
</template>
<script>
  import { DeleteOutlined } from '@ant-design/icons-vue'
  import { mapMutations, mapGetters, mapActions } from 'vuex'
  export default {
    components: {
      DeleteOutlined,
    },
    props: {
      data: {
        default: {},
      },
    },
    computed: {
      ...mapGetters({
        storeAreaList: 'appStore/storeSelector/storeAreaList',
      }),
    },
    data() {
      return {
        style: {
          width: '116px',
        },
        style3: {
          width: '86px',
        },
      }
    },
    methods: {
      ...mapMutations({
        deleteRecord: 'appStore/storeVerify/persist/deleteRecord',
        setProduct: 'appStore/storeVerify/persist/selectProduct',
        setVerifyType: 'appStore/storeVerify/persist/selectVerifyType',
        setProdNum: 'appStore/storeVerify/persist/updateProdNum',
        setRemark: 'appStore/storeVerify/persist/updateRemark',
      }),
      ...mapActions({
        setAreaId: 'appStore/storeVerify/persist/selectArea',
      }),
      selectArea(areaId) {
        const { detailId } = this.data
        this.setAreaId({ areaId, detailId })
      },
      selectProduct(storeProdId) {
        const { detailId } = this.data
        this.setProduct({ detailId, storeProdId })
      },
      selectVerifyType(verifiType) {
        const { detailId } = this.data
        this.setVerifyType({ verifiType, detailId })
      },
      updateProdNum(prodNum) {
        const { detailId } = this.data
        this.setProdNum({ prodNum, detailId })
      },
      updateRemark(remark) {
        const { detailId } = this.data
        this.setRemark({ remark, detailId })
      },
    },
  }
</script>
