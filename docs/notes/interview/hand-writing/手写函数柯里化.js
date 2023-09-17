const curry = function(fn){
  let args=[];
  const inner = function(){
      args = args.concat(...arguments);
      if(args.length === fn.length){
          return fn(...args);
      }else{
          return inner;
      }
  }
  return inner; 
}

// Test
const sum = (a, b, c, d) => a + b + c + d;
const currySum = curry(sum);
console.log(currySum(1)(2)(3)(4));
