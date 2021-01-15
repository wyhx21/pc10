<template>
  <app-container>
    <component :is="conponent" :ref="`refPersist${conponent}`" />

    <template #footer>
      <a-button size="small" class="app-modal-footer-button" @click="cancel">
        取消
      </a-button>
      <!-- 主界面 begin -->
      <div v-if="conponent == 'AppMain'">
        <a-popconfirm
          title="确认提交该订单信息"
          ok-text="确认"
          cancel-text="取消"
          @confirm="confirmPersist"
        >
          <a-button size="small" type="primary" class="app-modal-footer-button">
            确认新增
          </a-button>
        </a-popconfirm>
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
        <a-button
          size="small"
          type="primary"
          class="app-modal-footer-button"
          @click="submitData"
        >
          选择
        </a-button>
        <a-button
          size="small"
          type="primary"
          class="app-modal-footer-button"
          @click="initQuery"
        >
          查询
        </a-button>
      </div>

      <app-pagination
        :total="pageTotal"
        :current="pageInfo"
        @change="onPageChange"
        v-if="conponent == 'AppSupplier' || conponent == 'AppProduct'"
      />
      <!-- 供应商界面/商品界面 end -->
    </template>
  </app-container>
</template>
<script>
  import AppContainer from '@com/flexContainer'
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  import AppMain from './persistMain'
  import AppSupplier from './persistSupplier'
  import AppProduct from './persistProduct'
  import AppPagination from '@com/pagination'
  export default {
    components: {
      AppContainer,
      AppMain,
      AppSupplier,
      AppProduct,
      AppPagination,
    },
    computed: {
      ...mapGetters({
        conponent: 'appOrder/purchaseOrder/persist/conponent',
        pageInfo: 'appOrder/purchaseOrder/persist/pageInfo',
        pageTotal: 'appOrder/purchaseOrder/persist/pageTotal',
      }),
    },
    data() {
      return {}
    },
    methods: {
      ...mapMutations({
        toPage: 'appOrder/purchaseOrder/persist/toPage',
      }),
      ...mapActions({
        persistOrder: 'appOrder/purchaseOrder/persist/persistOrder',
        initQuery: 'appOrder/purchaseOrder/persist/initQuery',
      }),
      cancel() {
        this.$emit('cancel', false)
      },
      refreshData() {
        this.$emit('refreshData')
      },
      confirmPersist() {
        this.persistOrder()
          .then(() => {
            this.$emit('refresh')
          })
          .catch(() => {})
      },
      submitData() {
        if (this.conponent == 'AppSupplier') {
          this.$refs.refPersistAppSupplier.submit()
        } else if (this.conponent == 'AppProduct') {
          this.$refs.refPersistAppProduct.submit()
        }
      },
      onPageChange(page, size) {
        this.initQuery({ page, size })
      },
    },
  }
</script>
<style lang="scss">
  @import '@style/order.scss';
</style>
