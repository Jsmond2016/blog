Array.prototype.myReduce = function (fn, init=null) {
  const arr = this;
  if(arr.length===0){
      return init;
  }
  let result = null;
  let index = 0;
  if(!init){
      init = arr[index];
      index++;
  }
  while(index < arr.length){
      if(!arr.hasOwnProperty(index)){
          index++;
          continue;
      }
      const tmp = arr[index];
      result = fn(init, tmp);
      init = result;
      index++;
  }
  return result;
}
