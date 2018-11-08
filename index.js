function view() {
  return (
    <ul className="list">
      <li className="list-item">lemon</li>
      <li className="list-item">coffee</li>
      <li className="list-item">milk</li>
    </ul>
  );
}

// 拍平二维数组
function flatten(arr) {
  return [].concat(...arr);
}

function h(type, props, ...children) {
  return {
    type,
    props,
    children: flatten(children)
  };
}

function render(el) {
  el.appendChild(createElement(view()));
}

function createElement(node) {
  if (typeof node === "string") {
    return document.createTextNode(node);
  } else {
    const n = document.createElement(node.type);
    setProps(n, node.props);
    node.children.forEach(child => n.appendChild(createElement(child)));
    return n;
  }
}

function setProps(target, props) {
  Object.keys(props).forEach(key => setProp(target, key, props[key]));
}

function setProp(target, name, value) {
  if (name === "className") {
    target.setAttribute("class", value);
  } else {
    target.setAttribute(name, value);
  }
}

function removeProp(target, name) {
  //@
  if (name === "className") {
    return target.removeAttribute("class");
  }

  target.removeAttribute(name);
}

const REPLACE = "replace"; // 替换节点
const REMOVE = "remove"; // 删除节点
const ADD = "add"; //  新增节点
const UPDATE = "update"; //  新增节点
const SET_PROP = "set_prop"; // 新增或者更改prop
const REMOVE_PROP = "remove_prop"; //删除prop

function diff(oldNode, newNode) {
  if (!oldNode) {
    return {
      type: ADD,
      newNode
    };
  }

  if (!newNode) {
    return {
      type: REMOVE
    };
  }

  if (changed(oldNode, newNode)) {
    return {
      type: REPLACE,
      newNode
    };
  }

  if (newNode.type) {
    return {
      type: UPDATE,
      props: diffProps(newNode, oldNode),
      children: diffChildren(newNode, oldNode)
    };
  }
}

function changed(oldNode, newNode) {
  return (
    typeof oldNode !== typeof newNode ||
    (typeof newNode === "string" && oldNode !== newNode) ||
    oldNode.type !== newNode.type
  );
}

function diffProps(oldProps, newProps) {
  const patchs = [];
  const keys = new Set(Object.keys(oldProps).concat(Object.keys(newProps)));
  for (let key of keys) {
    const newVal = newNode.props[key];
    const oldVal = oldNode.props[key];
    if (!newVal) {
      patches.push({ type: REMOVE_PROP, key, value: oldVal });
    }
    if (!oldVal || newVal !== oldVal) {
      patches.push({ type: SET_PROP, key, value: newVal });
    }
  }
  return patchs;
}

function diffChildren(oldChildren, newChildren) {
  const patchs = [];
  const max = Math.max(oldChildren.length, newChildren.length);

  for (let i = 0; i < max; i++) {
    patchs.push(diff(oldChildren[i], newChildren[i]));
  }
  return patchs;
}

function applyPatch(parent, patch, index = 0) {
  const el = childNodes[index];
  switch (patch.type) {
    case ADD:
      parent.appendChild(createElement(patch.newNode));
      break;
    case REMOVE:
      parent.removeChild(el);
      break;
    case REPLACE:
      parent.replaceChild(createElement(patch.newNode), el);

      break;
    case UPDATE:
      patchProps(el, patch.props);
      patch.children.forEach((p, i)=> {
          applyPatch(el, p, i)
      })
      
      break;
  }
}

function patchProps(target, patches) {
  patches.forEach(patch => {
    switch (patch.type) {
      case SET_PROP:
        setProp(target, patch.key, patch.value);
        break;
      case REMOVE_PROP:
        removeProp(target, patch.key);
        break;
    }
  });
}
