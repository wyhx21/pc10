<template>
  <a-menu-item :key="routeChildren.id" @click.capture="handleLink">
    <span class="anticon">
      <vab-icon :icon="routeChildren?.menuIcon"></vab-icon>
    </span>
    <span>{{ routeChildren?.menuName }}</span>
  </a-menu-item>
</template>

<script>
  import { isExternal } from '@/utils/validate'
  import VabIcon from '@/layout/vab-icon'
  export default {
    name: 'MenuItem',
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
        default: () => null,
      },
    },
    methods: {
      handleLink() {
        const routePath = this.routeChildren.menuUrl
        const target = this.routeChildren?.target
        if (target === '_blank') {
          if (isExternal(routePath)) window.open(routePath)
          else if (this.$route.path !== routePath) window.open(routePath.href)
        } else {
          if (isExternal(routePath)) window.location.href = routePath
          else if (this.$route.path !== routePath) this.$router.push(routePath)
        }
      },
    },
  }
</script>
