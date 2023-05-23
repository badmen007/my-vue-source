import { isFunction } from "@vue/shared";
import { ReactiveEffect, activeEffect } from "./effect";
import { trackEffect, triggerEffect } from "./baseHandle";


class ComputedRefImpl {
    effect;
    _value;
    dep = new Set();
    __dirty = true;
    constructor(public getter, public setter) {
        this.effect = new ReactiveEffect(getter, () => {
            if (!this.__dirty) {
                this.__dirty = true
                triggerEffect(this.dep)
            }
        })
    }
    get value() {
        if (activeEffect) {
            trackEffect(this.dep)
        }
        if (this.__dirty) {
            this._value = this.effect.run()
            this.__dirty = false
        }
        return this._value
    }
    set value(val) {
        this.setter(val)
    }
}

export function computed(getterOrOptions) {

    const isGetter = isFunction(getterOrOptions)

    let getter;
    let setter;

    if (isGetter) {
        getter = getterOrOptions;
        setter = () => {
            console.warn('computed value must be readonly')
        }
    } else {
        getter = getterOrOptions.get;
        setter = getterOrOptions.set;
    }

    return new ComputedRefImpl(getter, setter)
}