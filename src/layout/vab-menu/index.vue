<template>
  <component :is="menuComponent" :item="item" :route-children="routeChildren">
    <template v-if="item.children && item.children.length">
      <vab-menu
        v-for="menu in item.children"
        :key="menu.id"
        :item="menu"
      ></vab-menu>
    </template>
  </component>
</template>

<script>
  import MenuItem from './components/MenuItem'
  import Submenu from './components/Submenu'
  export default {
    name: 'VabMenu',
    components: { MenuItem, Submenu },
    props: {
      item: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        routeChildren: {},
        menuComponent: '',
      }
    },
    created() {
      const showChildren = this.handleChildren(this.item.children)
      if (showChildren.length === 0) {
        this.menuComponent = 'MenuItem'
        this.routeChildren = this.item
      } else if (showChildren.menuType === 2) {
        this.menuComponent = 'MenuItem'
        this.routeChildren = showChildren[0]
      } else {
        this.menuComponent = 'Submenu'
      }
    },
    methods: {
      handleChildren(children = []) {
        return children === null ? [] : children
      },
    },
  }
</script>
<style lang="less">
  .anticon {
    margin-right: 3px !important;
  }
</style>
