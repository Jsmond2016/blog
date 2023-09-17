  //节流
  function throttle(fn, delay) {
    let timer;
    return function () {
        if (!timer) {
            timer = setTimeout(() => {
                fn();
                timer = null;
            }, delay)
        }
    }
}
//防抖
function debounce(fn, delay){
  let timer;
  return function(){
      if(timer){
          clearTimeout(timer);
      }
      timer = setTimeout(()=>{
              fn();
      }, delay);
  }
}
