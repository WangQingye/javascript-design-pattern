// 迭代器模式是指提供一种方法顺序访问一个聚合对象中的各个元素，而又不需要暴露该对象

// 内部迭代器 函数的内部已经定义好了迭代规则，它完全接手整个迭代过程，外部只需要一次初始调用
var each = function(obj, callback) {
    let value,
        i = 0,
        length = obj.length,
        isArray = isArrayLike(obj);
    if (isArray) { // 类数组迭代
        for (; i < length; i++) {
            value = callback.call(obj[i], i, obj[i]);
            if (value === false) break; // 约定返回false的时候可以跳出循环
        }
    } else { // 对象迭代
        for (i in obj) {
            value = callback.call(obj[i], i, obj[i]);
            if (value === false) break;
        }
    }
}

// 外部迭代器 外部迭代器增加了一些调用的复杂度，但相对也增强了迭代器的灵活性，我们可以手工控制迭代的过程或者顺序。
var Iterator = function(obj) {
    var current = 0;

    var next = function() {
        current += 1;
    };

    var isDone = function() {
        return current >= obj.length;
    }

    var getCurrItem = function() {
        return obj[current];
    }

    return {
        next,
        isDone,
        getCurrItem
    }
}

var compare = function (iterator1, iterator2) {
    while (!iterator1.isDone() && !iterator2.isDone()) {
        if (iterator1.getCurrItem() !== iterator2.getCurrItem()) {
            return false;
        }
        iterator1.next();
        iterator2.next();
    };
    return true;
}

var iterator1 = Iterator([1,2,3]);
var iterator2 = Iterator([1,2,3]);
compare(iterator1, iterator2);