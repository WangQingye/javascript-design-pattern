var strategies = {
    'isEmpty': function(value, errorMsg) {
        if (value === '') {
            return errorMsg;
        }
    },
    'minLength': function(value, errorMsg, length) {
        if (value.length < length) {
            return errorMsg;
        }
    },
    'isMobile': function(value, errorMsg) {
        if (!/(^1[3|5|8][0-9]{9}$)/.test(value)) {
            return errorMsg;
        }
    }
}

var Validator = function() {
    this.cache = []; // 校验规则
}

Validator.prototype.add = function(rule, value, errorMsg) {
    let args = Array.prototype.slice.call(arguments,1); // 把参数切割出来
    this.cache.push(function(){
        return strategies[rule](...args);
    });
}

Validator.prototype.start = function() {
    for (let i = 0; i < this.cache.length; i++) {
        let validateFunc = this.cache[i];
        let msg = validateFunc();
        if (msg) { // 如果有返回说明没通过
            return msg;
        }
    }
}

let test = new Validator();
test.add('isEmpty', '1', '不能为空');
test.add('minLength', '1', '长度不够', 5);
console.log(test.start());