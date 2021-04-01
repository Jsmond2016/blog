Function.prototype.myBind = function (context, ...outerArgs) {
  let fn = this;
  function res(...innerArgs) {
      if (this instanceof res) {
          // new操作符执行时
          fn.call(this, ...outerArgs, ...innerArgs)
      } else {
          // 普通bind
          fn.call(context, ...outerArgs, ...innerArgs)
      }
  }
  res.prototype = this.prototype;
  return res
}
var foo = {
  name: "foo",
  say: function () {
      console.log(this.name);
  }
}
foo.say.myBind({name: "William"})();
function Point(x, y) {
  this.x = x;
  this.y = y;
}
Point.prototype.toString = function () {
  return `${this.x}, ${this.y}`
}
const YAxisPoint = Point.myBind(null, 0);
const tmp = new YAxisPoint(5);
console.log(tmp);
console.log(tmp instanceof YAxisPoint, tmp instanceof Point);
