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
  import { mapActions, mapMutations } from 'vuex'

  export default {
    computed: {},
    watch: {
      idList: {
        handler(val) {
          this.checkedList = val
        },
        immediate: true,
      },
    },
    data() {
      return {
        checkedList: [],
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
        menuIdList: 'appSystemInfo/system/menuIdList',
      }),
      ...mapActions({
        getMenuTree: 'appSystemInfo/system/sysMenu',
      }),
      checkedTree(checkedKeys, { halfCheckedKeys }) {
        this.menuIdList([...checkedKeys, ...halfCheckedKeys])
        this.selectIdList = checkedKeys
      },
    },
  }
</script>
