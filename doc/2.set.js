
let a = 1
let s = new Set([a]);

[...s].forEach(item => { // 重新拷贝一下不会导致死循环
    s.delete(item)
    s.add(item)
    console.log(s)
})