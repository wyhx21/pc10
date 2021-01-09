<template>
  <app-container>
    <template #param>
      <a-input v-model:value="value" placeholder="Basic usage" />
    </template>
    <template #query>
      <a-button type="primary">
        <template #icon><SearchOutlined /></template>
        Primary
      </a-button>
      <a-button type="primary">
        <template #icon><SearchOutlined /></template>
        Primary
      </a-button>
    </template>
    这个是内容
    <template #footer>dixdddsfxd</template>
  </app-container>
</template>
<script>
  import appContainer from '@com/container.vue'
  import { SearchOutlined } from '@ant-design/icons-vue'
  export default {
    components: {
      appContainer,
      SearchOutlined,
    },
    data() {
      return {
        value: '',
      }
    },
  }
</script>
