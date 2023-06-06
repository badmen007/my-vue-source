export const nodeOPs = {
  insert(el, parent, anchor) {
    // anchor 为 null 时，等价于 appendChild
    parent.insertBefore(el, anchor || null);
  },
  remove(el) {
    const parent = el.parentNode;
    if (parent) {
      parent.removeChild(el);
    }
  },
  createElement(type) {
    return document.createElement(type);
  },
  createText(text) {
    return document.createTextNode(text);
  },
  setText(node, text) {
    // nodeValue 和 textContent 的区别
    // nodeValue 会将所有子节点的文本内容合并
    // textContent 只会获取当前节点的文本内容
    node.nodeValue = text;
  },
  setElementText(el, text) {
    el.textContent = text;
  },
  parentNode(node) {
    return node.parentNode;
  },
  nextSibling(node) {
    return node.nextSibling;
  }
};
