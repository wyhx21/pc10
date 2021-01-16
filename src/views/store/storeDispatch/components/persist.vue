<template>
  <app-container>
    <template #header>
      <app-header />
    </template>
  </app-container>
</template>
<script>
  import AppContainer from '@com/flexContainer'
  import AppHeader from './persistHeader'
  import { mapGetters, mapActions, mapMutations } from 'vuex'
  export default {
    components: {
      AppContainer,
      AppHeader,
    },
    computed: {
      ...mapGetters({
        sourceAreaList: 'appStore/storeDispatch/persist/sourceAreaList',
        toAreaList: 'appStore/storeDispatch/persist/toAreaList',
        detailList: 'appStore/storeDispatch/persist/detailList',
      }),
    },
    data() {
      return {}
    },
    methods: {
      ...mapMutations({
        setDetailList: 'appStore/storeDispatch/persist/detailList',
      }),
      ...mapActions({}),
    },
  }
</script>
<style lang="scss">
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
</style>
