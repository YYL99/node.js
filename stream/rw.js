var stream = require('stream');
var util = require('util');

util.inherits(Reader, stream.Readable);
util.inherits(Writer, stream.Writable);

function Reader() {
    stream.Readable.call(this);
    this._index = 1;
}

Reader.prototype._read = function (size) {
    var i = this._index++;
    if (i > 10) {
        this.push(null);
    } else {
        this.push('条目：' + i.toString());
    }
}

function Writer() {
    stream.Writable.call(this);
    this._index = 1;
}

Writer.prototype._write = function (data, encoding, callback) {
    console.log(data.toString('utf8'));
    callback();
}
var r = new Reader();
var w = new Writer();
r.pipe(w);