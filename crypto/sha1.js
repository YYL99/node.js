const crypto = require('crypto');

function sha1Sign(src) {
    const sha1 = crypto.createHash('sha1');
    sha1.update(src);
    return sha1.digest('hex').toString();
}

function makeSalt() {
    return crypto.randomBytes(16).toString('base64');
}
console.log(sha1Sign('22222'));
console.log(makeSalt('22222'));