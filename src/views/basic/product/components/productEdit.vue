<template>
  <a-form layout="horizontal" :model="currentData" class="app-edit-form_2">
    <a-form-item label="商品编码">
      <a-input
        v-model:value="currentData.prodCode"
        placeholder="商品编码"
        disabled
      />
    </a-form-item>
    <a-form-item label="商品名称">
      <a-input v-model:value="currentData.prodName" placeholder="商品名称" />
    </a-form-item>
    <a-form-item label="商品类型">
      <a-select v-model:value="currentData.prodType" placeholder="商品类型">
        <a-select-option v-for="item in typeList" :key="item['code']">
          {{ item['value'] }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="采购单价">
      <a-input-number
        :precision="2"
        v-model:value="currentData.purchPrice"
        placeholder="采购单价"
      />
    </a-form-item>
    <a-form-item label="销售单价">
      <a-input-number
        :precision="2"
        v-model:value="currentData.salePrice"
        placeholder="销售单价"
      />
    </a-form-item>
    <a-form-item label="商品单位">
      <a-input
        v-model:value="currentData.prodUnit"
        placeholder="商品单位"
        disabled
      />
    </a-form-item>
    <a-form-item label="是否有效">
      <app-switch v-model="currentData.deleted" />
    </a-form-item>
    <a-form-item label="备注信息">
      <a-textarea
        v-model:value="currentData.remark"
        placeholder="备注信息"
        showCount
        :maxlength="50"
        allow-clear
        :rows="3"
      />
    </a-form-item>
  </a-form>
</template>
<script>
  import AppSwitch from '@com/switch'
  import { mapGetters, mapMutations } from 'vuex'
  export default {
    components: {
      AppSwitch,
    },
    computed: {
      ...mapGetters({
        editData: 'appBasic/product/currentData',
        typeList: 'appBasic/product/prodTypeList',
      }),
    },
    watch: {
      editData: {
        handler(val) {
          this.currentData = { ...val }
        },
        immediate: true,
      },
    },
    data() {
      return {
        currentData: {},
      }
    },
    methods: {
      ...mapMutations({
        setEditData: 'appBasic/product/currentData',
      }),
      submit() {
        this.setEditData(this.currentData)
      },
    },
  }
</script>
