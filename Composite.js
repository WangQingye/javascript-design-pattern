//组合模式将对象组合成树形结构，以表示“部分整体”的层次结构。 除了用来表示树形结构之外，组合模式的另一个好处是通过对象的多态性表现，使得用户对单个对象和组合对象的使用具有一致性。
//组合功能已树形结构存在，每一个功能为上一级的叶功能，每一个叶功能又可能是新一个树节点，因此要求每一个功能都具有相同的调用方法，例如命令模式的excute

/**
 * 1、开空调
 * 2、打开电视和音响
 * 3、关门、开电脑、登录QQ
 */

var MacroCommand = function () {
    return {
        commandList: [],
        add: function (command) {
            this.commandList.push(command);
        },
        excute: function () {
            for (let i = 0, command; command = this.commandList[i++];) {
                command.excute();
            }
        }
    }
}

// 开空调
var openAcCommand = {
    excute: function () {
        console.log('打开空调');
    }
}

// 打开电视和音箱
var openTvCommand = {
    excute: function() {
        console.log('打开电视')
    }
}

var openSoundCommand = {
    excute: function() {
        console.log('打开音箱')
    }
}

var macroCommand1 = MacroCommand();
macroCommand1.add(openTvCommand);
macroCommand1.add(openSoundCommand);

// 关门，打开电脑和登录QQ
var closeDoorCommand = {
    excute: function(){
        console.log('关门');
    }
}

var openPcCommand = {
    excute: function(){
        console.log('打开电脑');
    }
}

var loginQQCommand = {
    excute: function(){
        console.log('登录QQ');
    }
}

var macroCommand2 = MacroCommand();
macroCommand2.add(closeDoorCommand);
macroCommand2.add(openPcCommand);
macroCommand2.add(loginQQCommand);

// 总命令
var macroCommand3 = MacroCommand();
macroCommand3.add(openAcCommand);
macroCommand3.add(macroCommand1);
macroCommand3.add(macroCommand2);

// 执行
macroCommand3.excute();
