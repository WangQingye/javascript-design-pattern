// 基本实现
var Singleton = function (name) {
    this.name = name;
    this.instance = null;
}

Singleton.prototype.getName = function () {
    console.log(this.name);
}

Singleton.getInstance = function () {
    return function (name) {
        if (!this.instance) {
            this.instance = new Singleton(name);
        }
        return instance;
    }
};


// JS中优化实现
/* 这一段代码的作用保证了fn(有返回)只执行一次 */
/* 可以作为一个纯粹的单例工厂，传入构造函数即可 */
var getSingle = function (fn) {
    var result;
    return function () {
        return result || (result = fn.apply(this, arguments))
    }
}

var single = getSingle(function () {
    return new Singleton(Array.prototype.shift.call(arguments));
});

var single1 = single('a');
var single2 = single('b');

single1.getName(); // a
single2.getName(); // a