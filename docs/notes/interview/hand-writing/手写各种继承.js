function Shape(type){
  this.type = type;
}

Shape.prototype.draw = function(){
  console.log(this.type);
}

function Circle(type, color){
  //执行父级构造函数
  Shape.call(this, type);
  this.color = color;
}
//继承原型方法
Circle.prototype = Object.create(Shape.prototype);
//属性 constructor 指向本来的构造函数
Circle.prototype.constructor = Circle;
let c = new Circle("circle", "red");
c.draw();
