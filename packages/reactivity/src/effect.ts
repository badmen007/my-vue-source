
export let activeEffect = undefined

function cleanupEffect(effect) {
    // 找到deps中的set 删除掉effect
    let deps = effect.deps
    for (let i = 0; i < deps.length; i++) {
        // deps 里面都是set
        deps[i].delete(effect)
    }
    effect.deps.length = 0
}

export class ReactiveEffect{
    parent = undefined
    constructor(public fn, public scheduler) {}
    deps = []
    run() {
        // 当运行的时候我们需要将属性和effect关联起来
        try {
            this.parent = activeEffect
            activeEffect = this
            cleanupEffect(this)
            return this.fn() // 执行的时候会取值 会执行get方法 依赖收集
        } finally {
            activeEffect = this.parent
        }
    }
}

// 属性和effect之间是什么关系 n:n 一个属性有多个effect，一个effect可以对应多个属性

export function effect(fn, options: any = {}) {
    // 把用户的函数变成一个响应式的函数
    const _effect = new ReactiveEffect(fn, options.scheduler)
    // 默认先执行一次
    _effect.run()
    
    const runner = _effect.run.bind(_effect)
    return runner
}