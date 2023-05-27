import { isObject } from "@vue/shared";
import { ReactiveFlags, mutableHandlers } from "./baseHandle";

export function reactive(target) {
  return createReactiveObject(target);
}

const reactiveMap = new WeakMap(); // 会自动垃圾回收，不会造成内存泄漏

// 响应式对象的核心逻辑
function createReactiveObject(target) {
  if (!isObject(target)) {
    return;
  }
  if (target[ReactiveFlags.IS_REACTIVE]) {
    // 这里取值会触发get方法
    return target;
  }
  // 防止一个对象被代理多次，如果已经被代理过了，就不要再次代理了
  let existingProxy = reactiveMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }

  const proxy = new Proxy(target, mutableHandlers);
  reactiveMap.set(target, proxy);

  return proxy;
}

// 判断有没有响应式
export function isReactive(source) {
  return !!(source && source[ReactiveFlags.IS_REACTIVE]);
}

// 转换成有响应式的
export function toReactive(source) {
  return isObject(source) ? reactive(source) : source;
}
