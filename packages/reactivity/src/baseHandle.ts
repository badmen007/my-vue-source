import { activeEffect } from "./effect"

export const enum ReactiveFlags { 
    'IS_REACTIVE' = '__v_isReactive',
}

export const mutableHandlers = {
    get(target, key, receiver) {
        if (key === ReactiveFlags.IS_REACTIVE) {
            return true
        }
        track(target, key)
        return Reflect.get(target, key, receiver)
    },
    set(target, key, value, receiver) {
        target[key] = value
        return Reflect.set(target, key, value, receiver)
    }
}

// Map = {({name: 'xz', age: 20}): name}
// Map = { name: Set(effect1, effect2) }
const targetMap = new WeakMap()
function track(target, key) {
    if (activeEffect) {
        // 如果有正在运行的effect，说明属性和effect有关联,才收集依赖
        let depsMap = targetMap.get(target)
        if (!depsMap) {
            targetMap.set(target, (depsMap = new Map()))
        }
        let dep = depsMap.get(key)
        if (!dep) {
            depsMap.set(key, (dep = new Set()))
        }
        let shouldTrack = dep.has(activeEffect)
        if (!shouldTrack) {
            dep.add(activeEffect)
            activeEffect.deps.push(dep) // effect记录有哪些属性
        }
    }
}