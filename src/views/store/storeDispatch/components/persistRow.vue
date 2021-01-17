<template>
  <a-row class="app-store-dispatch-persist-main_row">
    <a-col :span="4">
      <a-select
        :value="data['sourceAreaId']"
        :key="data['keyIndex']"
        placeholder="调出区域"
        :style="style"
        size="small"
        @change="selectSourceArea"
      >
        <a-select-option v-for="opt in sourceAreaList" :key="opt['code']">
          {{ opt['value'] }}
        </a-select-option>
      </a-select>
    </a-col>
    <a-col :span="4">
      <a-select
        :value="data['storeProdId']"
        placeholder="调出商品"
        :key="data['keyIndex']"
        :style="style"
        size="small"
        @change="selectStoreProd"
      >
        <a-select-option
          v-for="opt in data['sourceProdList']"
          :key="opt['storeProdId']"
        >
          {{ opt['prodName'] }}
        </a-select-option>
      </a-select>
    </a-col>
    <a-col :span="4">
      <span>{{ data['sourceProdNum'] }}</span>
    </a-col>
    <a-col :span="4">
      <a-select
        :value="data['toAreaId']"
        placeholder="调入区域"
        :key="data['keyIndex']"
        :style="style"
        size="small"
        :disabled="!data['storeProdId']"
        @change="selectToArea"
      >
        <a-select-option v-for="opt in toAreaList" :key="opt['code']">
          {{ opt['value'] }}
        </a-select-option>
      </a-select>
    </a-col>
    <a-col :span="4">
      <span>{{ data['toProdNum'] }}</span>
    </a-col>
    <a-col :span="3">
      <a-input-number
        :precision="2"
        :key="data['keyIndex']"
        size="small"
        :value="data['prodNum']"
        :style="prodNumStyle"
        @update:value="updateProdNum"
        placeholder="调度数量"
        allow-clear
        :disabled="!data['toProdNum']"
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
        sourceAreaList: 'appStore/storeDispatch/persist/sourceAreaList',
        toAreaList: 'appStore/storeDispatch/persist/toAreaList',
      }),
    },
    data() {
      return {
        style: {
          width: '116px',
        },
        prodNumStyle: {
          width: '86px',
        },
      }
    },
    methods: {
      ...mapMutations({
        deleteRecord: 'appStore/storeDispatch/persist/deleteRecord',
        setStoreProdId: 'appStore/storeDispatch/persist/setStoreProdId',
        setProdNum: 'appStore/storeDispatch/persist/setProdNum',
      }),
      ...mapActions({
        setSourceAreaId: 'appStore/storeDispatch/persist/setSourceAreaId',
        setToAreaId: 'appStore/storeDispatch/persist/setToAreaId',
      }),
      selectSourceArea(sourceAreaId) {
        const { detailId } = this.data
        this.setSourceAreaId({ sourceAreaId, detailId })
      },
      selectStoreProd(storeProdId) {
        const { detailId } = this.data
        this.setStoreProdId({ storeProdId, detailId })
      },
      selectToArea(toAreaId) {
        const { detailId, prodId } = this.data
        this.setToAreaId({ detailId, prodId, toAreaId })
      },
      updateProdNum(prodNum) {
        const { detailId } = this.data
        this.setProdNum({ prodNum, detailId })
      },
    },
  }
</script>
