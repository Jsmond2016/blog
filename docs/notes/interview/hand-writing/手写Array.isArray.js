Array.myIsArray = function(arr){
  return Object.prototype.toString.call(arr)==="[object Array]";
}
