var stream = require('stream');
var util = require('util');

util.inherits(JSONObjTransform, stream.Transform);

function JSONObjTransform() {
    stream.Transform.call(this);
}

JSONObjTransform.prototype._transform = function (data, encoding, callback) {
    var object = data ? JSON.parse(data.toString('utf8')) : "";
    this.emit('object', object);
    object.handled = true;
    this.push(JSON.stringify(object));
    callback();
}

JSONObjTransform.prototype._flush = function (callback) {
    callback();
}

var tc = new JSONObjTransform();
tc.on('object', function (object) {
    console.log('姓名：%s', object.name);
    console.log('性别：%s', object.sex);
})

tc.on('data', function (data) {
    console.log('数据：%s', data.toString('utf8'));
})

tc.write('{"name": "李明", "sex": "男"}');
tc.write('{"name": "张三", "sex": "女"}');
tc.write('{"name": "二狗", "sex": "男"}');