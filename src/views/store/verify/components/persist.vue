<template>
  <app-container>
    <template #header>
      <app-header />
    </template>

    <div class="app-store-verify-persist">
      <a-row class="app-store-verify-persist-main_header">
        <a-col :span="4">仓库区域</a-col>
        <a-col :span="4">选择商品</a-col>
        <a-col :span="4">商品库存</a-col>
        <a-col :span="4">核销类型</a-col>
        <a-col :span="4">核销数量</a-col>
        <a-col :span="3">备注信息</a-col>
        <a-col :span="1">
          <a v-if="detailDisabled" @click="addRecord"><PlusCircleOutlined /></a>
        </a-col>
      </a-row>

      <div class="app-store-verify-persist-main_main">
        <div v-for="item of detailList" :key="item['detailId']">
          <app-row :data="item" />
        </div>
        <div
          v-if="!detailDisabled"
          class="app-store-verify-persist-main_placeholder"
        >
          请选择仓库及核销分类
        </div>
        <div v-else class="app-store-verify-persist-main_placeholder">
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
  @import '@style/variable.scss';
  .app-store-verify-persist-header {
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

  .app-store-verify-persist {
    margin: 0 10px;
    height: 100%;

    .app-store-verify-persist-main_header {
      text-align: center;
      font-weight: 900;
      height: 25px;
      line-height: 25px;
    }

    .app-store-verify-persist-main_main {
      height: calc(100% - 25px);
      overflow: auto;

      .app-store-verify-persist-main_placeholder {
        text-align: center;
        color: $app-main-font-placeholder;
        line-height: 30px;
      }

      .app-store-verify-persist-main_row {
        text-align: center;
        line-height: 30px;
      }
    }
  }
</style>
