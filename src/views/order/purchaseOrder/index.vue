<template>
  <app-container>
    <template #param>
      <app-param ref="refPurchaseOrderParam" />
    </template>
  </app-container>
</template>
<script>
  import AppContainer from '@com/container'
  import AppParam from './components/param'

  export default {
    components: {
      AppParam,
      AppContainer,
    },
  }
</script>
