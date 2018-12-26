// 发布—订阅模式又叫观察者模式，它定义对象间的一种一对多的依赖关系，当一个对象的状
// 态发生改变时，所有依赖于它的对象都将得到通知。在 JavaScript 开发中，我们一般用事件模型
// 来替代传统的发布—订阅模式。

var event = {
    clientList: [],
    listen: function (key, fn) {
        if (!this.clientList[key]) {
            this.clientList[key] = []
        }
        this.clientList[key].push(fn);
    },
    trigger: function () {
        var key = Array.prototype.shift.call(arguments),
            fns = this.clientList[key];
        if (!fns || fns.length === 0) return false;
        for (let i = 0; i < fns.length; i++) {
            let fn = fns[i];
            fn.apply(this, arguments);
        }
    }
}

var installEvent = function (obj) {
    for (var i in event) {
        obj[i] = event[i];
    }
}
// 使用
var obj = {};
installEvent(obj);

obj.listen('event1', function(){
    console.log('trigger event1', arguments);
})
obj.listen('event2', function(){
    console.log('trigger event2', arguments);
})

obj.trigger('event1', 1)