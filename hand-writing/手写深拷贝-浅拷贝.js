// 不考虑循环引用
function deepCopy(obj) {
  let res;
  if (typeof obj === "object") {
      if (Array.isArray(obj)) {
          res = [];
      } else {
          res = {};
      }
      for (let key in obj) {
          const tmp = obj[key];
          if (typeof tmp === "object") {
              res[key] = deepCopy(tmp);
          } else {
              res[key] = tmp;
          }
      }
      return res;
  } else {
      return obj;
  }
}


// 考虑循环引用
function deepCopy(obj, uniqueList = []) {
  let res;
  if (typeof obj === "object") {
      res = Array.isArray(obj) ? [] : {};
      //记录所有需要递归调用的 key 和 value，避免一直循环
      const uniqueDate = find(uniqueList, obj);
      if (uniqueDate) {
          return uniqueDate.target;
      }
      uniqueList.push({
          source: obj,
          target: res
      });
      for (let key in obj) {
          const tmp = obj[key];
          if (typeof tmp === "object") {
              res[key] = deepCopy(tmp, uniqueList);
          } else {
              res[key] = tmp;
          }
      }
      console.log(uniqueList);
      return res;
  } else {
      return obj;
  }
}

function find(arr, item) {
  for (let a of arr) {
      if (a.source === item) {
          return a;
      }
  }
  return null;
}
