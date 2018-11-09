//

function listDiff(oldList, newList) {
  const oldMap = keyIndex(oldList),
    newMap = keyIndex(newList),
    oldKeyIndex = oldMap.keys,
    oldFree = oldMap.free,
    newKeyIndex = newMap.keys,
    newFree = newMap.free;
  const moves = [],
    // 模拟列表，描述如何操作转换
    children = [];
  let i = 0,
    item,
    itemKey,
    freeIndex = 0,
    freeItem,
    simulateItem,
  simulateItemKey;

  while (i < oldList.length) {
    item = oldList[i];
    itemKey = item.key;
    if (itemKey) {
      // 旧列表中该项为有指定key的项
      if (!newKeyIndex.hasOwnProperty(itemKey)) {
        // 新列表中不存在了
        children.push(null);
      } else {
        // 新列表还存在该元素，获取新列表中的
        children.push(newList[newKeyIndex[itemKey]]);
      }
    } else {
      // 旧列表中该项为自由项，让位给新列表的自由项
      freeItem = newFree[freeIndex++];
      children.push(freeItem || null);
    }

    i++;
  }

  const simulateList = children.slice();

  i = 0;

  while (i < simulateList.length) {
    if (simulateList[i] === null) {
      remove(i);
      removeSimulate(i);
    } else {
      i++;
    }
  }

  i = 0;
  let j = 0;

  while (i < newList.length) {
    item = newList[i];
    itemKey = newList[i].key;
    simulateItem = simulateList[j];
    simulateItemKey = (simulateItem && simulateItem.key) || undefined;

    if (simulateItem) {
      if (itemKey === simulateItemKey) {
        j++;
      } else {
        if (!oldKeyIndex.hasOwnProperty(itemKey)) {
          // 新元素 插入
          insert(i, item);
        } else {
          // ???
          // if remove current simulateItem make item in right place
          // then just remove it
          var nextItemKey = simulateList[j + 1] && simulateList[j + 1]['key'] || undefined;
          if (nextItemKey === itemKey) {
            remove(i);
            removeSimulate(j);
            j++; // after removing, current j is right, just jump to next one
          } else {
            // else insert item
            insert(i, item);
          }
        }
      }
    } else {
      insert(i, item)
    }

    i++
  }

    //if j is not remove to the end, remove all the rest item
    var k = simulateList.length - j
    while (j++ < simulateList.length) {
      k--
      remove(k + i)
    }








  function remove(index) {
    moves.push({ index, type: 0 });
  }

  function insert(index, item) {
    moves.push({
      index,
      item,
      type: 1
    });
  }

  function removeSimulate(index) {
    simulateList.splice(index, 1);
  }

  return {
    moves,
    children
  };
}

// @{params} Array
// @{return} Object
// 返回数组中 有key的索引对应 和 没有key的自由项
function keyIndex(list) {
  const keys = {},
    free = [],
    length = list.length;
  for (let i = 0; i < length; i++) {
    if (list[i].key) {
      keys[list[i].key] = i;
    } else {
      free.push(i);
    }
  }
  return {
    keys,
    free
  };
}

const oldList = [
  {key: 'a', name: 'A'},
  {key: 'b', name: 'B'},
  {key: 'c', name: 'C'},
  {key: 'd', name: 'D'},
  {key: 'e', name: 'E'},
];
const moves = listDiff(oldList, [
  {key: 'c', name: 'C'},
  {key: 'a', name: 'A'},
  {key: 'g', name: 'G'},
  {key: 'b', name: 'B'},
  {key: 'e', name: 'E'},
  {key: 'f', name: 'F'},
]);



const result = oldList.slice()
moves.moves.forEach(function(move) {

  if (move.type === 0) {
    result.splice(move.index, 1) // type 0 is removing
  } else {
    result.splice(move.index, 0, move.item) // type 1 is inserting
  }
})
console.log(result)