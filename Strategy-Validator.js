var strategies = {
    'isEmpty': function (value, errorMsg) {
        if (value === '') {
            return errorMsg;
        }
    },
    'minLength': function (value, errorMsg, length) {
        if (value.length < length) {
            return errorMsg;
        }
    },
    'isMobile': function (value, errorMsg) {
        if (!/(^1[3|5|8][0-9]{9}$)/.test(value)) {
            return errorMsg;
        }
    }
}

var Validator = function () {
    this.cache = []; // 校验规则
}

Validator.prototype.add = function () {
    for (let i = 1; i < arguments.length; i++) {
        let rule = arguments[i][0];
        let args = arguments[i].slice(1); // 把参数切割出来
        if (typeof arguments[0] !== 'string') {
            console.log('验证器需要先设置value');
            return;
        }
        args.unshift(arguments[0]);
        this.cache.push(function () {
            return strategies[rule](...args);
        });
    }
}

Validator.prototype.start = function () {
    for (let i = 0; i < this.cache.length; i++) {
        let validateFunc = this.cache[i];
        let msg = validateFunc();
        if (msg) { // 如果有返回说明没通过
            return msg;
        }
    }
}

let test = new Validator();
// 需要注意的是如果第一条没有通过，不会执行第二条
test.add('33', ['isEmpty', '不能为空'], ['minLength', '长度不够', 5]);
test.add('', ['isEmpty', '不能为空'], ['minLength', '长度不够', 5]);
console.log(test.start());