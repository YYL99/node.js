var stream = require('stream');
var util = require('util');
util.inherits(Output, stream.Readable);

function Output() {
    stream.Readable.call(this);

    this.content = ['开始数据', '中间数据', '结束数据'];
    this._index = 0;
}

Output.prototype._read = function () {
    if (this._index > this.content.length) {
        this.push(null);
    } else {
        this.push(this.content[this._index]);
        this._index ++;
    }
}

var out = new Output();
console.log('开始读取：' + out.read().toString('utf8'));

out.on('data', function (data) {
    console.log('回调函数读取：' + data.toString());
})

out.on('end', function () {
    console.log('已全部读取！');
})