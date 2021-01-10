/**
 * 返回所以选中的叶子节点
 * @param { 树节点 } trees
 * @param { 选中的节点 } selectList
 */
const treeSelectUtil = (treeList = [], selectList = []) => {
  const res = []
  for (let { children, id } of treeList) {
    if (children && children.length > 0) {
      res.push(...treeSelectUtil(children, selectList))
    } else {
      if (selectList.includes(id)) {
        res.push(id)
      }
    }
  }
  return res
}

export { treeSelectUtil }
