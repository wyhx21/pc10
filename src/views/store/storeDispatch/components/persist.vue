<template>
  <app-container>
    <template #header>
      <app-header />
    </template>

    <div class="app-store-dispatch-persist">
      <a-row class="app-store-dispatch-persist-main_header">
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

      <div class="app-store-dispatch-persist-main_main">
        <div v-for="item of detailList" :key="item['detailId']">
          <app-row :data="item" />
        </div>
        <div
          v-if="!detailDisabled"
          class="app-store-dispatch-persist-main_placeholder"
        >
          请选择调出仓库及调入仓库
        </div>
        <div v-else class="app-store-dispatch-persist-main_placeholder">
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
  import { mapGetters, mapActions, mapMutations } from 'vuex'
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
        setDetailList: 'appStore/storeDispatch/persist/detailList',
        addRecord: 'appStore/storeDispatch/persist/addRecord',
      }),
      ...mapActions({}),
    },
  }
</script>
<style lang="scss">
  @import '@style/variable.scss';

  .app-store-dispatch-persist-header {
    width: calc(100% - 40px);
    margin: 0 20px 5px 20px;

    td {
      padding: 5px;
      & > div {
        display: inline-block;
        margin: 0 5px;
      }
    }
  }
  .app-store-dispatch-persist {
    margin: 0 10px;
    height: 100%;

    .app-store-dispatch-persist-main_header {
      text-align: center;
      font-weight: 900;
      height: 25px;
      line-height: 25px;
    }

    .app-store-dispatch-persist-main_main {
      height: calc(100% - 25px);
      overflow: auto;

      .app-store-dispatch-persist-main_placeholder {
        text-align: center;
        color: $app-main-font-placeholder;
        line-height: 30px;
      }

      .app-store-dispatch-persist-main_row {
        text-align: center;
        line-height: 30px;
      }
    }
  }
</style>
