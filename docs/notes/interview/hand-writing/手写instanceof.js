function myInstanceof(f, F) {
  let flag = false;
  while (!flag && f.__proto__) {
      flag = f.__proto__ === F.prototype;
      f = f.__proto__;
  }
  return flag;
}
