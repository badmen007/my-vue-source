var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b ||= {})
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));

// packages/runtime-dom/src/nodeOps.ts
var nodeOPs = {
  insert(el, parent, anchor) {
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

// packages/runtime-dom/src/props.ts
function patchStyle(el, prevValue, nextValue) {
  const style = el["style"];
  if (nextValue) {
    for (let key in nextValue) {
      style[key] = nextValue[key];
    }
  }
  if (prevValue) {
    for (let key in prevValue) {
      if (nextValue[key] == null) {
        style[key] = "";
      }
    }
  }
}
function patchClass(el, nextValue) {
  if (nextValue == null) {
    el.removeAttribute("class");
  } else {
    el.className = nextValue;
  }
}
function createInvoker(val) {
  const invoker = (e) => {
    invoker.value(e);
  };
  invoker.value = val;
  return invoker;
}
function patchEvent(el, eventName, nextValue) {
  const invokers = el._vei || (el._vei = {});
  const exists = invokers[eventName];
  if (exists && nextValue) {
    exists.value = nextValue;
  } else {
    const name = eventName.slice(2).toLowerCase();
    if (nextValue) {
      const invoker = invokers[eventName] = createInvoker(nextValue);
      el.addEventListener(name, invoker);
    } else if (exists) {
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
function patchProp(el, key, prevValue, nextValue) {
  if (key === "style") {
    return patchStyle(el, prevValue, nextValue);
  } else if (key === "class") {
    return patchClass(el, nextValue);
  } else if (/^on[^a-z]/.test(key)) {
    return patchEvent(el, key, nextValue);
  } else {
    return patchAttr(el, key, nextValue);
  }
}

// packages/runtime-dom/src/index.ts
var renderOptions = __spreadProps(__spreadValues({}, nodeOPs), { patchProp });
console.log(renderOptions);
//# sourceMappingURL=runtime-dom.js.map
