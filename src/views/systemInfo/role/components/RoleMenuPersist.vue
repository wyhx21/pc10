<template>
  <a-tree
    checkable
    :tree-data="treeList"
    :replace-fields="replaceFields"
    :checked-keys="selectIdList"
    @check="checkedTree"
  />
</template>

<script>
  import { mapActions, mapMutations, mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters({
        currentData: 'appSystemInfo/role/currentData',
      }),
    },
    data() {
      return {
        replaceFields: {
          title: 'label',
          value: 'id',
          key: 'id',
          children: 'children',
        },
        treeList: [],
        selectIdList: [],
      }
    },
    beforeMount() {
      this.getMenuTree()
        .then((res) => {
          const { trees, idList } = res
          this.treeList = trees
          this.selectIdList = idList
        })
        .catch(() => {})
    },
    methods: {
      ...mapMutations({
        menuIdList: 'appSystemInfo/role/menuIdList',
      }),
      ...mapActions({
        getMenuTree: 'appSystemInfo/role/roleMenu',
      }),
      checkedTree(checkedKeys, { halfCheckedKeys }) {
        this.menuIdList([...checkedKeys, ...halfCheckedKeys])
        this.selectIdList = checkedKeys
      },
    },
  }
</script>
