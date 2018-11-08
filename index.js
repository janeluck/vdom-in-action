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
      return document.createTextNode(node)
  } else {
      const n = document.createElement(node.type)
      setProps(n, node.props)  
      node.children.forEach(child => n.appendChild(createElement(child)))
      return n 
  }
}


function setProps(target, props){
    Object.keys(props).forEach(key => setProp(target, key, props[key]))
}

function setProp(target, name, value){
    if(name === 'className'){
        target.setAttribute('class', value)
    }else{
        target.setAttribute(name, value)
    }

}
