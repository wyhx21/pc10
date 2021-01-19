<template>
  <app-container>
    <template #header>
      <app-header />
    </template>

    <div class="app-store-persist">
      <a-row class="app-store-persist-main_header">
        <a-col :span="4">调出仓库区域</a-col>
        <a-col :span="4">调出商品信息</a-col>
        <a-col :span="4">调出商品库存</a-col>
        <a-col :span="4">调入仓库区域</a-col>
        <a-col :span="4">调入商品库存</a-col>
        <a-col :span="3">调度商品数量</a-col>
        <a-col :span="1">
          <a v-if="detailDisabled" @click="addRecord"><PlusCircleOutlined /></a>
        </a-col>
      </a-row>

      <div class="app-store-persist-main_main">
        <div v-for="item of detailList" :key="item['detailId']">
          <app-row :data="item" />
        </div>
        <div v-if="!detailDisabled" class="app-store-persist-main_placeholder">
          请选择调出仓库及调入仓库
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
  import AppRow from './persistRow'
  import { PlusCircleOutlined } from '@ant-design/icons-vue'
  import { mapGetters, mapMutations } from 'vuex'
  export default {
    components: {
      AppContainer,
      AppHeader,
      PlusCircleOutlined,
      AppRow,
    },
    computed: {
      ...mapGetters({
        detailList: 'appStore/storeDispatch/persist/detailList',
        detailDisabled: 'appStore/storeDispatch/persist/detailDisabled',
      }),
    },
    data() {
      return {}
    },
    methods: {
      ...mapMutations({
        addRecord: 'appStore/storeDispatch/persist/addRecord',
      }),
    },
  }
</script>
<style lang="scss">
  @import '@style/store.scss';
</style>
