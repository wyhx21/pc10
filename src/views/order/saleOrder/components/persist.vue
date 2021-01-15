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
          @click="toPage('AppCustomer')"
        >
          选择客户
        </a-button>
      </div>
      <!-- 主界面 end -->

      <!-- 客户界面/商品界面 begin -->
      <div v-if="conponent == 'AppCustomer' || conponent == 'AppProduct'">
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
        v-if="conponent == 'AppCustomer' || conponent == 'AppProduct'"
      />
      <!-- 供应商界面/商品界面 end -->
    </template>
  </app-container>
</template>
<script>
  import AppContainer from '@com/flexContainer'
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  import AppMain from './persistMain'
  import AppCustomer from './persistCustomer'
  import AppProduct from './persistProduct'
  import AppPagination from '@com/pagination'
  export default {
    components: {
      AppContainer,
      AppMain,
      AppCustomer,
      AppProduct,
      AppPagination,
    },
    computed: {
      ...mapGetters({
        conponent: 'appOrder/saleOrder/persist/conponent',
        pageInfo: 'appOrder/saleOrder/persist/pageInfo',
        pageTotal: 'appOrder/saleOrder/persist/pageTotal',
      }),
    },
    data() {
      return {}
    },
    methods: {
      ...mapMutations({
        toPage: 'appOrder/saleOrder/persist/toPage',
      }),
      ...mapActions({
        persistOrder: 'appOrder/saleOrder/persist/persistOrder',
        initQuery: 'appOrder/saleOrder/persist/initQuery',
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
        if (this.conponent == 'AppProduct') {
          this.$refs.refPersistAppProduct.submit()
        } else if (this.conponent == 'AppCustomer') {
          this.$refs.refPersistAppCustomer.submit()
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
