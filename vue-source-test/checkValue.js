
/** 原理 */
function getValue(data, path) {
  let paths = path.split('.')
  let res = data
  while (prop = paths.shift()) {
    res = res[prop]
  }
  return res
}

const data = {
  a: {
    b: {
      c: 'zzz'
    }
  }
}

// getValue(data, 'a.b.c')
console.log('getValue', getValue(data, 'a.b.c'));

/** 升级版，柯里化--使用闭包方式提升性能 */
function createGetValue(path) {
  let paths = path.split('.')

  return function getValue(data) {
    let res = data
    while (prop = paths.shift()) {
      res = res[prop]
    }
    return res
  }
}


const data2 = {
  a: {
    b: {
      c: 'zzz'
    }
  }
}
const fn = createGetValue('a.b.c')
const res = fn(data2)
console.log('createGetValue', res);