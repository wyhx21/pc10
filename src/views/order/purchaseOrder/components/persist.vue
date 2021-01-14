<template>
  <app-container>
    <component :is="conponent" :ref="`refPersist${conponent}`" />

    <template #footer>
      <a-button size="small" class="app-modal-footer-button" @click="cancel">
        取消
      </a-button>
      <!-- 主界面 begin -->
      <div v-if="conponent == 'AppMain'">
        <a-button
          size="small"
          type="primary"
          class="app-modal-footer-button"
          @click="confirmPersist"
        >
          确认新增
        </a-button>
        <a-button
          size="small"
          type="primary"
          class="app-modal-footer-button"
          @click="toPage('AppProduct')"
        >
          选择商品
        </a-button>
        <a-button
          size="small"
          type="primary"
          class="app-modal-footer-button"
          @click="toPage('AppSupplier')"
        >
          选择供应商
        </a-button>
      </div>
      <!-- 主界面 end -->

      <!-- 供应商界面/商品界面 begin -->
      <div v-if="conponent == 'AppSupplier' || conponent == 'AppProduct'">
        <a-button
          size="small"
          type="primary"
          class="app-modal-footer-button"
          @click="toPage('AppMain')"
        >
          返回主界面
        </a-button>
      </div>
      <!-- 供应商界面/商品界面 end -->
    </template>
  </app-container>
</template>
<script>
  import AppContainer from '@com/flexContainer'
  import { mapGetters, mapMutations } from 'vuex'
  import AppMain from './persistMain'
  import AppSupplier from './persistSupplier'
  import AppProduct from './persistProduct'
  export default {
    components: {
      AppContainer,
      AppMain,
      AppSupplier,
      AppProduct,
    },
    computed: {
      ...mapGetters({
        conponent: 'appOrder/purchaseOrder/persist/conponent',
      }),
    },
    data() {
      return {}
    },
    methods: {
      ...mapMutations({
        toPage: 'appOrder/purchaseOrder/persist/toPage',
      }),
      cancel() {
        this.$emit('cancel', false)
      },
      refreshData() {
        this.$emit('refreshData')
      },
      confirmPersist() {
        alert('confirm')
      },
    },
  }
</script>
<style lang="scss">
  .order-persist {
    height: calc(100% - 20px);
    margin-top: 20px;
  }
  .order-persist_header {
    text-align: center;
    height: 30px;
    margin-bottom: 10px;
  }
  .order-persist_main {
    height: calc(100% - 40px);
    overflow: auto;
  }
</style>
