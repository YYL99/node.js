const crypto = require('crypto');

function sha1Sign(src) {
    const sha1 = crypto.createHash('sha1');
    sha1.update(src);
    return sha1.digest('hex').toString();
}
console.log(sha1Sign('hello world!'));
