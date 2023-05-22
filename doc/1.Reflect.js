
const person = {
    name: '张三',
    age: 18,
    get aliasName() {
        return this.name + '同学'
    }
}

const proxy = new Proxy(person, {
    get(target, key, receiver) {
        console.log(key)
        // return target[key] 下面的打印是aliasName 张三同学
        return Reflect.get(target, key, receiver) // 为什么要用Reflect.get 因为Reflect.get可以拿到原型链上的属性
        // Reflect.get 下面打印是 aliasName name 张三同学  多了name 
    },
    set(target, key, value, receiver) {
        target[key] = value
        return Reflect.set(target, key, value, receiver)
    }
});

console.log(proxy.aliasName)

proxy.name = '李四'