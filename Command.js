// 命令模式的核心目的在于把分送请求的对象和接受命令的对象解耦
// 核心实现是实现一个Command对象，含有一个excute方法

var Commander = function(receiver) {
    this.receiver = receiver;
};

Commander.prototype.execute = function(){
    this.receiver.doSomething();
}

var setCommand = function(sender, command) {
    sender.send = function(){
        command.execute();
    }
}

// 另外可以用命令模式实现命令队列，或者是重做撤销等功能，核心实现是将所有执行过的命令放入堆栈中
var obj1 = {
    execute: function() {
        console.log(1);
    }
}
var obj2 = {
    execute: function() {
        console.log(2);
    }
}
// 产生命令
var makeCommand = function(receiver){
    return function() {
        receiver.execute();
    }
}
var commandStack = [];
var sender = {};
sender.send = function(obj) {
    let command = makeCommand(obj);
    if (command) {
        command();
        commandStack.push(command);
    }
}

sender.send(obj1);
sender.send(obj2);

var replay = function() {
    let command;
    while (command = commandStack.shift()) {
        command();
    }
}

replay();