
export let activeEffect = undefined

class ReactiveEffect{
    parent = undefined
    constructor(public fn) {}
    deps = []
    run() {
        // 当运行的时候我们需要将属性和effect关联起来
        try {
            this.parent = activeEffect
            activeEffect = this
            return this.fn() // 执行的时候会取值 会执行get方法
        } finally {
            activeEffect = this.parent
        }
    }
}

// 属性和effect之间是什么关系 n:n 一个属性有多个effect，一个effect可以对应多个属性

export function effect(fn) {
    // 把用户的函数变成一个响应式的函数
    const _effect = new ReactiveEffect(fn)
    // 默认先执行一次
    _effect.run()
}