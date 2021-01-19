<template>
  <app-container>
    <template #header>
      <app-header />
    </template>

    <div class="app-store-persist">
      <a-row class="app-store-persist-main_header">
        <a-col :span="4">仓库区域</a-col>
        <a-col :span="4">选择商品</a-col>
        <a-col :span="3">商品库存</a-col>
        <a-col :span="4">核销类型</a-col>
        <a-col :span="3">核销数量</a-col>
        <a-col :span="5">备注信息</a-col>
        <a-col :span="1">
          <a v-if="detailDisabled" @click="addRecord"><PlusCircleOutlined /></a>
        </a-col>
      </a-row>

      <div class="app-store-persist-main_main">
        <div v-for="item of detailList" :key="item['detailId']">
          <app-row :data="item" />
        </div>
        <div v-if="!detailDisabled" class="app-store-persist-main_placeholder">
          请选择仓库及核销分类
        </div>
        <div v-else class="app-store-persist-main_placeholder">
          <a @click="addRecord">点击添加记录</a>
        </div>
      </div>
    </div>
  </app-container>
</template>
<script>
  import AppContainer from '@com/flexContainer'
  import AppHeader from './persistHeader'
  import { PlusCircleOutlined } from '@ant-design/icons-vue'
  import { mapGetters, mapMutations } from 'vuex'
  import AppRow from './persistRow'
  export default {
    components: {
      PlusCircleOutlined,
      AppContainer,
      AppHeader,
      AppRow,
    },
    computed: {
      ...mapGetters({
        detailList: 'appStore/storeVerify/persist/detailList',
        detailDisabled: 'appStore/storeVerify/persist/detailDisabled',
      }),
    },
    methods: {
      ...mapMutations({
        addRecord: 'appStore/storeVerify/persist/addRecord',
      }),
    },
  }
</script>
<style lang="scss">
  @import '@style/store.scss';
</style>
