<template>
  <table class="app-store-dispatch-persist-header">
    <tr>
      <td width="50%">
        <div>调出仓库</div>
        <div>
          <a-select
            :value="sourceStoreId"
            :disabled="storeDisabled"
            placeholder="调出仓库"
            style="width: 150px"
            @change="selectSourceStore"
          >
            <a-select-option v-for="opt in storeList" :key="opt['code']">
              {{ opt['value'] }}
            </a-select-option>
          </a-select>
        </div>
      </td>
      <td>
        <div>调入仓库</div>
        <div>
          <a-select
            :value="toStoreId"
            :disabled="storeDisabled"
            placeholder="调入仓库"
            style="width: 150px"
            @change="selectToStore"
          >
            <a-select-option v-for="opt in storeList" :key="opt['code']">
              {{ opt['value'] }}
            </a-select-option>
          </a-select>
        </div>
      </td>
    </tr>
    <tr>
      <td colspan="2">
        <a-textarea
          :value="remark"
          @update:value="setRemark"
          placeholder="备注信息"
          :maxlength="50"
          allow-clear
        />
      </td>
    </tr>
  </table>
</template>
<script>
  import { mapGetters, mapActions, mapMutations } from 'vuex'
  export default {
    components: {},
    computed: {
      ...mapGetters({
        storeList: 'appStore/storeSelector/storeList',
        sourceStoreId: 'appStore/storeDispatch/persist/sourceStoreId',
        toStoreId: 'appStore/storeDispatch/persist/toStoreId',
        remark: 'appStore/storeDispatch/persist/remark',
        storeDisabled: 'appStore/storeDispatch/persist/storeDisabled',
      }),
    },
    data() {
      return {}
    },
    mounted() {
      this.querySysStore()
    },
    methods: {
      ...mapMutations({
        setSourceStoreId: 'appStore/storeDispatch/persist/sourceStoreId',
        setToStoreId: 'appStore/storeDispatch/persist/toStoreId',
        setRemark: 'appStore/storeDispatch/persist/remark',
        setSourceAreaList: 'appStore/storeDispatch/persist/sourceAreaList',
        setToAreaList: 'appStore/storeDispatch/persist/toAreaList',
      }),
      ...mapActions({
        querySysStore: 'appStore/storeSelector/querySysStore',
        queryStoreArea: 'appStore/storeSelector/queryStoreArea',
      }),
      selectSourceStore(storeId) {
        this.queryStoreArea(storeId)
          .then((res) => {
            this.setSourceAreaList(res)
            this.setSourceStoreId(storeId)
          })
          .catch(() => {})
      },
      selectToStore(storeId) {
        this.queryStoreArea(storeId)
          .then((res) => {
            this.setToAreaList(res)
            this.setToStoreId(storeId)
          })
          .catch(() => {})
      },
    },
  }
</script>
