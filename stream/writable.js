var util = require('util');
var stream = require('stream');

util.inherits(Write, stream.Writable);

function Write() {
    stream.Writable.call(this);
    this.data = new Array();
}

Write.prototype._write = function (data, encoding, callback) {
    this.data.push(data.toString('utf8'));
    console.log('写入数据：' + data);
    callback();
}

var w = new Write();
for (var i = 0; i < 3; i++) {
    w.write('数据' + i);
}

w.end('写入最后的数据', 'utf8', function () {
    console.log('写入最后数据成功，不再接收数据！');
});

console.log('现在w中的数据是：' + w.data);