  //方式一
  function create(obj){
    function F(){}
    F.prototype = obj;
    return new F();
}
// 方式二
function create(obj){
  const m = {};
  m.__proto__ = obj;
  return m;
}
