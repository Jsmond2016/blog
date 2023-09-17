class EventHub {
  cache = {};
  //订阅
  add(eventName, fn) {
    // 这里的本质是这个 this.cache[eventName] =  Array.isArray(this.cache[eventName]) ? this.cache[eventName].push(fn) : [fn]
    this.cache[eventName] = this.cache[eventName] || [];
    this.cache[eventName].push(fn);
  }
  //取消订阅
  off(eventName, fn) {
    const fns = this.cache[eventName] || [];
    const index = fns.indexOf(fn);
    if (index >= 0) {
      this.cache[eventName].splice(index, 1);
    }
  }
  //发布
  emit(eventName, data) {
    const fns = this.cache[eventName] || [];
    for (let fn of fns) {
      fn(data);
    }
  }

  // 只执行一次订阅的事件，然后移除
  once(eventName, callback) {
    // 绑定的时fn, 执行的时候会触发fn函数
    let fn = () => {
      callback(); // fn函数中调用原有的callback
      this.off(eventName, fn); // 删除fn, 再次执行的时候之后执行一次
    }
    this.add(eventName, fn)
  }
}

// Test
const o1 = new EventHub()

function LogAA() {
  console.log('aa')
}

o1.add('aa', LogAA)
o1.emit('aa')

function LogBB() {
  console.log('bb')
}

o1.add('bb', LogBB)
o1.off('bb', LogBB)
o1.emit('bb')

o1.once('love', function () {
  console.log('love')
})

o1.emit('love')
o1.emit('love')



// 相关资料 https://www.jianshu.com/p/e0575e17de2a