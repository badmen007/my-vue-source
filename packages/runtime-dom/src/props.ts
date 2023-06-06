
function patchStyle(el, prevValue, nextValue) {
  
  const style = el['style'];
  // 新的元素需要覆盖
  if (nextValue) {
    for (let key in nextValue) {
      style[key] = nextValue[key];
    }
  }
  
  // 新的有老得没有，需要删除
  if (prevValue) {
    for (let key in prevValue) {
      if (nextValue[key] == null) {
        style[key] = '';
      }
    }
  }
}

function patchClass(el, nextValue) {
  if (nextValue == null) {
    el.removeAttribute('class');
  } else {
    el.className = nextValue;
  }
}

// 这里的代码写的有技巧
function createInvoker(val) {
  const invoker = (e) => {
    invoker.value(e);
  }
  invoker.value = val;
  return invoker;
}

function patchEvent(el, eventName, nextValue) {

  const invokers = el._vei || (el._vei = {});

  const exists = invokers[eventName];

  if (exists && nextValue) {
    exists.value = nextValue; // 换绑事件
  } else {
    const name = eventName.slice(2).toLowerCase();
    if (nextValue) {
      const invoker = (invokers[eventName] =  createInvoker(nextValue));
      el.addEventListener(name, invoker);
    } else if (exists) { // 新的没有，老的有，删除
      el.removeAddEventListener(name, exists);
      invokers[eventName] = null;
    }
  }
}

function patchAttr(el, key, nextValue) {
  if (nextValue == null) {
    el.removeAttribute(key);
  } else {
    el.setAttribute(key, nextValue);
  }
}

export function patchProp(el, key, prevValue, nextValue) {
 // 属性的初始化和更新
  
  if (key === 'style') {
    return patchStyle(el, prevValue, nextValue);
  } else if (key === 'class') {
    return patchClass(el, nextValue);
  } else if (/^on[^a-z]/.test(key)) {
    // 事件
    return patchEvent(el, key, nextValue)
  } else {
    return patchAttr(el, key, nextValue);
  }
}
