// 享元模式的原理是将对象的属性划分为内部状态与内部状态
// 外部状态是可以隔离和改变的，剥离了外部状态的对象成为共享对象，从而减少了系统中对象的数量
// 还有典型的应用是对象池
// 一个上传对象的例子

// 真实的共享对象，内部状态只有type
class Upload {
    constructor(type) {
        this.uploadType = type;
        console.log('生成:'+type);
        this.reset();
    }
    reset() {
        this.fileName = '';
        this.fileSize = '';
    }
    doUpload() {
        console.log('开始上传' + this.fileName);
        this.reset();
    }
}

// 生产共享对象的工厂
class UploadFactory {
    constructor() {
        this.createdFlyweightObjs = {}
    }
    create(type) {
        if (this.createdFlyweightObjs[type]) {
            return this.createdFlyweightObjs[type];
        }
        return this.createdFlyweightObjs[type] = new Upload(type);
    }
}
const uploadFactory = new UploadFactory();
// 共享对象外部状态管理中心
class UploadManager {
    constructor() {
        this.uploadDatas = [];
    }
    // 记录对象的外部状态
    add(type, fileName, fileSize) {
        this.uploadDatas.push({
            fileName,
            fileSize,
            type
        })
    }
}
const uploadManager = new UploadManager();
uploadManager.add('a', 'name', 3000);
uploadManager.add('b', 'name2', 3000);
uploadManager.add('a', 'name1', 3000);
uploadManager.add('b', 'name3', 3000);
uploadManager.add('b', 'name4', 3000);

let startUpload = function () {
    for (let i = 0; i < uploadManager.uploadDatas.length; i++) {
        const element = uploadManager.uploadDatas[i];
        let upload = uploadFactory.create(element.type);
        upload.fileName = element.fileName;
        upload.fileSize = element.fileSize;
        upload.doUpload();
    }
}

startUpload();

// 打印结果： 只会生成一次a和b
// 生成:a
// 开始上传name
// 生成:b
// 开始上传name2
// 开始上传name1
// 开始上传name3
// 开始上传name4