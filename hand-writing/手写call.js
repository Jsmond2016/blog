Function.prototype.myCall = function (context) {
  // 第一个参数是 this/window/obj，我们只需要传入的参数，即 [...arguments].slice(1)
  const args = [...arguments].slice(1);
  //使用一个对象属性模拟
  const obj = context || window;
  const fn = Symbol("fn");
  // 暂存 this
  obj[fn] = this;
  // 使用 this 调用方法
  const res = obj[fn](...args);
  delete obj[fn];
  return res;
}


// Test

function Test() {
  console.log(arguments)
  console.log([...arguments].slice(1))
}


Test.call(this, 1,2, {a: 1})
Test.myCall(this, 1,2, {a: 1})


// 作者：追公交车的小仙女
// 链接：https://juejin.cn/post/6924912691102351368
// 来源：掘金
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。


Function.prototype.iCall = function (context) {
  const args = [...arguments].slice(1)

  const obj = context || window

  const fn = Symbol('fn')

  obj[fn] = this

  const res = obj[fn](...args)

  delete obj[fn]

  return res
}
