<template>
  <table class="app-store-persist-header">
    <tr>
      <td width="50%">
        <div>选择仓库</div>
        <div>
          <a-select
            :value="storeId"
            :disabled="selecDisable"
            placeholder="选择仓库"
            style="width: 150px"
            @change="selectStore"
          >
            <a-select-option v-for="opt in storeList" :key="opt['code']">
              {{ opt['value'] }}
            </a-select-option>
          </a-select>
        </div>
      </td>
      <td>
        <div>核销分类</div>
        <div>
          <a-select
            :value="verifyCode"
            :disabled="selecDisable"
            placeholder="核销分类"
            style="width: 150px"
            @change="setVerifyCode"
          >
            <a-select-option v-for="opt in typeList" :key="opt['code']">
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
        typeList: 'appStore/storeVerify/verifyTypeList',

        storeId: 'appStore/storeVerify/persist/storeId',
        verifyCode: 'appStore/storeVerify/persist/verifyCode',
        remark: 'appStore/storeVerify/persist/remark',

        selecDisable: 'appStore/storeVerify/persist/selecDisable',
      }),
    },
    data() {
      return {}
    },
    methods: {
      ...mapMutations({
        setStoreId: 'appStore/storeVerify/persist/storeId',
        setVerifyCode: 'appStore/storeVerify/persist/verifyCode',
        setRemark: 'appStore/storeVerify/persist/remark',
      }),
      ...mapActions({
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
