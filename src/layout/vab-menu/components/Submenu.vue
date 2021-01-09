<template>
  <a-sub-menu :key="item.id">
    <template v-slot:title>
      <span class="anticon">
        <vab-icon :icon="item?.menuIcon"></vab-icon>
      </span>
      <span>{{ item?.menuName }}</span>
    </template>
    <slot></slot>
  </a-sub-menu>
</template>

<script>
  import VabIcon from '@/layout/vab-icon'
  export default {
    name: 'Submenu',
    components: { VabIcon },
    props: {
      item: {
        type: Object,
        default() {
          return null
        },
      },
      routeChildren: {
        type: Object,
        default() {
          return null
        },
      },
    },
    methods: {},
  }
</script>
