  // 同 call 不同的是第二个参数必须是数组
  Function.prototype.myApply = function (context, args = []) {
    const obj = context || window;
    const fn = Symbol("fn");
    obj[fn] = this;
    const res = obj[fn](...args);
    delete obj[fn];
    return res;
}


// Test:

console.log(Math.max.myApply(this, [1,2,3])) // 3

console.log(Math.max.apply(this, [1,2,3])) // 3

// 作者：追公交车的小仙女
// 链接：https://juejin.cn/post/6924912691102351368
// 来源：掘金
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。



Function.prototype.apply = function (context, args = []) {

  const obj = context || window

  const fn = Symbol('fn')

  obj[fn] = this

  const res = obj[fn](...args)

  delete obj[fn]

  return res
}