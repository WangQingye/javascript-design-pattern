// 代理模式的主要作用是在客户与真正的执行者之前建立一层中介，比如减少一些不必要的开销
// 重要的一点是一般来说代理跟本体都有相同的接口，方便拆分，或者移除代理，对用户层面来说是没有关系的

// 虚拟代理 - 图片预加载

var myImage = (function(){
    var imgNode = document.createElement('img');
    document.body.appendChild(imgNode);
    return {
        setSrc: function(src) {
            imgNode.src = src;
        }
    }
})();

var proxyImage = (function(){
    var img = new Image();
    // 加载完成后替换成正式地址
    img.onload = function(){
        myImage.setSrc(this.src);
    }
    return {
        setSrc: function(src) {
            // 加载之前先用loading图
            myImage.setSrc('file://loading.gif');
            // 开始加载
            img.src = src;
        }
    }
})();

proxyImage.setSrc('http://www.a.com/photo/a.jpg');

// 缓存代理 - 计算乘积（实际程序中可能是其他复杂运算，或者是一些早就请求过的分页数据）
var mult = function() {
    console.log('开始计算乘积')
    var a = 1;
    for (var i = 0, l = arguments.length; i < l; i++) {
        a = a * arguments[i];
    }
    return a;
};

mult(2,3); // 6
mult(2,3,4); // 2,3,4

// 缓存代理函数
var proxyMult = (function(){
    var cache = {};
    return function() {
        var args = Array.prototype.join.call(arguments, ',');
        if (args in cache) {
            return cache[args];
        }
        return cache[args] = mult.apply(this, arguments);
    }
})();

proxyMult(1,2,3,4); // 24;
// 第二次直接从缓存中读取
proxyMult(1,2,3,4); // 24;