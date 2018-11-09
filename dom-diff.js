//

function listDiff(oldChildren, newChildren) {
  const newChildIndex = keyIndex(newChildren),
    newKeys = newChildIndex.keys,
    newFree = newChildIndex.free;

  // 新Child都是未注册key的自由项，todo 可以直接替换了
  if (newFree.length === newChildren.length) {
    return {
      children: newChildren,
      moves: null
    };
  }


  const oldChildIndex = keyIndex(oldChildren),
    oldKeys = oldChildIndex.keys,
    oldFree = oldChildIndex.free;
  // 旧Child都是未注册key的自由项，todo 可以直接替换了
  if (newFree.length === newChildren.length) {
    return {
      children: newChildren,
      moves: null
    };
  }




  

  


}

// @{params} Array
// @{return} Object
// 返回数组中 有key的索引对应 和 没有key的自由项
function keyIndex(children) {
  const keys = {},
    free = [],
    length = children.length;
  for (let i = 0; i < length; i++) {
    if (children[i].key) {
      keys[children[i].key] = i;
    } else {
      free.push(i);
    }
  }
  return {
    keys,
    free
  };
}
