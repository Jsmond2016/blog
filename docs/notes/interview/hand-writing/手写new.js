function create(fn, ...rest) {
  //相当于 let obj.__proto__ = fn.prototype;
  let obj = Object.create(fn.prototype);
  let result = fn.apply(obj, rest);
  if (typeof result === 'object') {
      return result;
  } else {
      return obj;
  }
}
