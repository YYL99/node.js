var stream = require('stream');
var util = require('util');
util.inherits(Duplexer, stream.Duplex);

function Duplexer(opt) {
    stream.Duplex.call(this, opt);
    this.data = [];
}
Duplexer.prototype._read = function readItem(size) {
    var chunk = this.data.shift();
    if (chunk == 'stop') {
        this.push(null);
    } else if (chunk) {
        this.push(chunk);
    } else {
        setTimeout(readItem.bind(this), 500, size);
    }
}

Duplexer.prototype._write = function (data, encoding, callback) {
    this.data.push(data);
    callback();
}

var d = new Duplexer();
d.on('data', function (chunk) {
    console.log('读取：' + chunk.toString('utf8'));
})

d.write('我认为', 'utf8');
d.write('我很好看', 'utf8');
d.write('结束！', 'utf8');
d.write('stop');
console.log(d.data.toString('utf8'));