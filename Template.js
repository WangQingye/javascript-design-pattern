// 模板方法用一句话概括就是把相同的地方抽象到公共的抽象类中用以继承

class Beverage {
    stepOne() {
        console.log(1);
    }
    stepTwo() {
        throw new Error('new rewrite step two');
    }
    stepThree() {
        console.log(3);
    }
    init() {
        this.stepOne();
        this.stepTwo();
        this.stepThree();
    }
};

class Tea extends Beverage {
    constructor() {
        super();
    }
    stepTwo() {
        console.log(2);
    }
}

let a = new Tea();
a.init();