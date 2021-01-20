<template>
  <table width="100%">
    <tr>
      <td width="30%">
        <span>供应商编码:</span>
        <span>{{ data['supplierCode'] }}</span>
      </td>
      <td width="30%">
        <span>供应商名称:</span>
        <span>{{ data['supplierName'] }}</span>
      </td>
      <td>
        <span>订单号:</span>
        <span>{{ data['orderNo'] }}</span>
      </td>
    </tr>
    <tr>
      <td>
        <span>订单状态:</span>
        <span>{{ data['statusValue'] }}</span>
      </td>
      <td>
        <span>更新时间:</span>
        <span>{{ data['lastModifiedDate'] }}</span>
      </td>
      <td>
        <span>选择仓库:</span>
        <a-select
          :value="storeId"
          style="width: 120px"
          placeholder="选择仓库"
          size="small"
          @change="selectStore"
        >
          <a-select-option v-for="opt in storeList" :key="opt['code']">
            {{ opt['value'] }}
          </a-select-option>
        </a-select>
      </td>
    </tr>
  </table>
</template>
<script>
  import { mapGetters, mapActions, mapMutations } from 'vuex'
  export default {
    computed: {
      ...mapGetters({
        data: 'appStore/instore/currentData',
        storeId: 'appStore/instore/storeId',
        storeList: 'appStore/storeSelector/storeList',
      }),
    },
    beforeMount() {
      this.querySysStore()
      this.setStoreId()
    },
    methods: {
      ...mapMutations({
        setStoreId: 'appStore/instore/storeId',
      }),
      ...mapActions({
        querySysStore: 'appStore/storeSelector/querySysStore',
        queryStoreArea: 'appStore/storeSelector/queryStoreArea',
      }),
      selectStore(storeId) {
        this.queryStoreArea(storeId)
          .then(() => {
            this.setStoreId(storeId)
          })
          .catch(() => {})
      },
    },
  }
</script>
