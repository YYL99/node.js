/*const crypto = require('crypto');

const desIv = '\1\2\3\4\5\6\7\x08'; 
function desCreateCipheriv (plaintext, desKey) {
    const key = new Buffer(desKey);
    const iv = new Buffer(desIv ? desIv : 0);
    // encrypt
    let cipher = crypto.createCipheriv('des-cbc', key, iv);
    cipher.setAutoPadding(true);
    let ciph = cipher.update(plaintext, 'utf8', 'hex');
    ciph += cipher.final('hex');
    return ciph
}

function desDecryptCipheriv (plaintext, desKey) {
    const key = new Buffer(desKey);
    const iv = new Buffer(desIv);
    const decipher = crypto.createDecipheriv('des-cbc', key, iv);
    decipher.setAutoPadding(true);
    let txt = decipher.update(plaintext, 'base64', 'utf8');
    txt += decipher.final('utf8');
    return txt;
}
const secret = crypto.randomBytes(32);
const content = "hello world!";

console.log(desCreateCipheriv(content, secret));
console.log(desDecryptCipheriv(content, secret));

*/
const crypto = require("crypto");
 
//const secret = crypto.randomBytes(32); // 密钥
const secret = "I".repeat(32);
const content = "hello world!"; // 要加密的明文
 
const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    secret,
    Buffer.alloc(16, 0)
);
cipher.update(content, "utf8");
const miwen = cipher.final("hex");
console.log(miwen);


const secret1 = "I".repeat(32);
const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    secret1,
    Buffer.alloc(16, 0)
);
//decipher.update("a061e67f5643d948418fdb150745f24d", "hex");
decipher.update(miwen, "hex");
console.log(decipher.final("utf8")); 