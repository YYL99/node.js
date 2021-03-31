/*
# 生成私钥
openssl genrsa -out privatekey.pem 1024
# 生成公钥
openssl rsa -in privatekey.pem -pubout -out publickey.pem
*/
const crypto = require("crypto");
const fs = require("fs");
 
const privateKey = fs.readFileSync("./privatekey.pem");
const publicKey = fs.readFileSync("./publickey.pem");
 
const content = "hello world!"; // 待加密的明文内容
 
// 公钥加密
const encodeData = crypto.publicEncrypt(publicKey, Buffer.from(content));
console.log(encodeData.toString("base64"));
console.log(encodeData);
// 私钥解密
const decodeData = crypto.privateDecrypt(privateKey, encodeData);
console.log(decodeData.toString("utf8"));
//console.log(decodeData);

const a = encodeData.toString("base64");
const d = new Buffer.from(a, 'base64');
console.log(d);

const decodeData1 = crypto.privateDecrypt(privateKey, d);
console.log(decodeData1.toString("utf8"));

const b = new Buffer.from('SmF2YVNjcmlwdA==', 'base64')
const s = b.toString();
console.log(s);

