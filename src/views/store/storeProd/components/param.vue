<template>
  <a-form layout="inline" :model="params" class="app-param-form_1">
    <a-form-item label="选择仓库">
      <a-select
        v-model:value="params.storeId"
        placeholder="选择仓库"
        @change="selectStore"
      >
        <a-select-option v-for="item in storeList" :key="item['code']">
          {{ item['value'] }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="仓库区域">
      <a-select v-model:value="params.areaId" placeholder="仓库区域">
        <a-select-option v-for="item in areaList" :key="item['code']">
          {{ item['value'] }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="商品编码">
      <a-input v-model:value="params.prodCode" placeholder="商品编码" />
    </a-form-item>
  </a-form>
</template>
<script>
  import { mapMutations, mapGetters, mapActions } from 'vuex'
  export default {
    computed: {
      ...mapGetters({
        storeList: 'appStore/storeSelector/allStoreList',
        areaList: 'appStore/storeSelector/allStoreAreaList',
      }),
    },
    data() {
      return {
        params: {
          areaId: '',
          storeId: '',
          prodCode: '',
        },
      }
    },
    beforeMount() {
      this.storeQuery()
    },
    methods: {
      ...mapMutations({
        queryParam: 'appStore/storeProd/queryParam',
      }),
      ...mapActions({
        querySysStore: 'appStore/storeSelector/querySysStore',
        queryStoreArea: 'appStore/storeSelector/queryStoreArea',
      }),
      submit() {
        this.queryParam(this.params)
      },
      clean() {
        this.queryParam()
        this.params = {
          areaId: '',
          storeId: '',
          prodCode: '',
        }
      },
      storeQuery() {
        this.querySysStore()
          .then(() => {
            this.params.storeId = ''
            this.params.areaId = ''
          })
          .catch(() => {
            this.params.storeId = ''
            this.params.areaId = ''
          })
      },
      selectStore(storeId) {
        this.queryStoreArea(storeId)
          .then(() => {
            this.params.areaId = ''
          })
          .catch(() => {
            this.params.areaId = ''
          })
      },
    },
  }
</script>
