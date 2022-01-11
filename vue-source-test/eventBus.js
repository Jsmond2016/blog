

let eventBus = {}
function EventBusDispatch() {
  // let eventBus = {}
  const on = function (type, handler) {
    (eventBus[type] || (eventBus[type] = [])).push(handler)
  }
  const off = function (type, handler) {
    console.log('off--arguments', arguments)
    if (arguments.length === 0) {
      // off() ???
      eventBus = {}
    } else if(arguments.length === 1) {
      // off(type)
      eventBus[type] = []
    } else if (arguments.length === 2) {
      // off(type, handler)
      let fnArr = eventBus[type]
      if (!fnArr || !fnArr.length) return
      // 倒着循环，数组序号不受影响
      for (let i = fnArr.length-1; i >= 0; i--) {
        if (fnArr[i] === handler) {
          fnArr.splice(i, 1)
        }
      }
    }
  }
  const emit = function (type)  {
    console.log('emit---arguments: ', arguments);
    let args = [].slice(arguments, 1)
    let fns = eventBus[type]
    if (!fns) return
    for (let i=0; i<fns.length; i++) {
      fns[i].apply(null, args)
    }
  }
  return {
    eventBus,
    on,
    off,
    emit
  }
}

const { on, off, emit } = EventBusDispatch()

const fn1 = () => console.log('fn1')
const fn2 = () => console.log('fn2')
const fn3 = () => console.log('fn3')
on('click', fn1)
on('click2', fn2)
on('click2', fn3)
console.log('eventBus111', eventBus)
emit('click')
off('click2')
console.log('eventBus222', eventBus)

off('click', fn1)

console.log('eventBus333', eventBus)

on('click', fn1)
on('click2', fn2)
on('click2', fn3)

console.log('444---全都有', eventBus)

off()

// ????
console.log('555--全部被删除', eventBus)

