import { isObject } from "@vue/shared"
import { activeEffect, effect } from "./effect"
import { reactive } from "./reactive"

export const enum ReactiveFlags { 
    'IS_REACTIVE' = '__v_isReactive',
}

export const mutableHandlers = {
    get(target, key, receiver) {
        if (key === ReactiveFlags.IS_REACTIVE) {
            return true
        }
        track(target, key)
        let result = Reflect.get(target, key, receiver)
        if (isObject(result)) { // 如果是对象，递归代理
            return reactive(result)
        }
        return result
    },
    set(target, key, value, receiver) {
        const oldValue = target[key]
        let flag = Reflect.set(target, key, value, receiver)
        if (value !== oldValue) {
            trigger(target, key, value, oldValue)
        }
        return flag
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

function trigger(target, key, value, oldValue) {
    // 找到effect执行就行
    const depsMap = targetMap.get(target)
    if (!depsMap) return
    let effects = depsMap.get(key)
    if (effects) {
        effects = [...effects]; // 先拷贝 在循环 不会导致死循环
        effects.forEach(effect => {
            if (activeEffect !== effect) { // 防止死循环
                if (effect.scheduler) {
                    // 当传递了scheduler的话，要执行scheduler，不执行run方法
                    effect.scheduler(effect)
                } else {
                    effect.run()
                }
            }
        })
    }    
}