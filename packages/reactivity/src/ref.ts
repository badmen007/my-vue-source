import { trackEffect, triggerEffect } from "./baseHandle";
import { activeEffect } from "./effect";
import { toReactive } from "./reactive";

export function ref(value) {
  return new RefImpl(value);
}

class RefImpl {
  _value;
  dep = new Set();
  constructor(public rawValue) {
    this._value = toReactive(rawValue);
  }
  get value() {
    if (activeEffect) {
      trackEffect(this.dep);
    }
    return this._value;
  }
  set value(newVal) {
    if (newVal !== this.rawValue) {
      this.rawValue = newVal;
      this._value = toReactive(newVal);
      triggerEffect(this.dep);
    }
  }
}
// 就是一个代理 去原数据里面去取值
class ObjectRefImpl {
  constructor(public object, public key) { }
  get value() {
    return this.object[this.key];
  }
  set value(val) {
    this.object[this.key] = val;
  }
}
export function toRef(object, key) {
  return new ObjectRefImpl(object, key);
}

export function toRefs(object) {
  let res = {};
  for (let key in object) {
    res[key] = toRef(object, key);
  }
  return res;
}
