/**
 * 策略模式是定义一系列算法，把他们一个个封装起来
 *  */

// 例子场景，不同等级的奖金计算
// 传统模式

// 策略A
var performanceA = function(){};

performanceA.prototype.calculate = function(salary) {
    return salary * 4;
}
// 策略B
var performanceB = function(){};

performanceB.prototype.calculate = function(salary) {
    return salary * 3;
}

// 使用者
var Bonus = function() {
    this.salary = null;
    this.strategy = null;
}

Bonus.prototype.setSalary = function(salary) {
    this.salary = salary; // 设置原始工资
}

Bonus.prototype.setStrategy = function(strategy) {
    this.strategy = strategy; // 设置计算策略
}

Bonus.prototype.getBonus = function() {
    return this.strategy.calculate(this.salary);
}

// 实际使用
var bonus = new Bonus();

bonus.setSalary(10000);
bonus.setStrategy(new performanceA());
console.log(bonus.getBonus()); // 40000;

bonus.setStrategy(new performanceB());
console.log(bonus.getBonus()); // 30000;


// javascript 中的实现
var strategies = {
    "A": function(salary) {
        return salary * 4;
    },
    "B": function(salary) {
        return salary * 3;
    }
}

var calculateBonus = function(level, salary) {
    return strategies[level](salary);
}

console.log(calculateBonus('A', 10000)); // 40000
console.log(calculateBonus('B', 10000)); // 30000