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
  export default {
    components: {
      AppContainer,
      AppHeader,
    },
  }
</script>
<style lang="scss">
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
</style>
