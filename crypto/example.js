const crypto = require('crypto');
const assert = require('assert');
const Crypto = require('cryptojs').Crypto
const _crypto = require('crypto')
const cryptoJS = require('crypto-js')
const mode = new Crypto.mode.CBC(Crypto.pad.pkcs7)
const bytes = require('utf8-bytes')
const aesKey = ''
const aesIv = ''
const algorithm = 'aes-128-cbc'

//1. sha1
function sha1Sign(src) {
    const sha1 = crypto.createHash('sha1');
    sha1.update(src);
    return sha1.digest('hex').toString();
}

function makeSalt() {
    return crypto.randomBytes(16).toString('base64');
}

//2. hash
function hashPassword(password, salt) {
    assert(password && salt, 'pwd or salt missing');
    const _salt = new Buffer(salt, 'base64');
    return crypto.pbkdf2Sync(password, _salt, 10000, 64).toString('base64');
}

//4. dec
const algorithm = 'aes-256-ctr',
    password = '';

function encrypt(buffer){
    let cipher = crypto.createCipher(algorithm,password)
    let crypted = Buffer.concat([cipher.update(buffer),cipher.final()]);
    return crypted;
}

function decrypt(buffer){
    let decipher = crypto.createDecipher(algorithm,password)
    let dec = Buffer.concat([decipher.update(buffer) , decipher.final()]);
    return dec;
}

//5. des-cbc
const desIv = '\1\2\3\4\5\6\7\x08'; 
//(在不同的语言对初始向量的处理方式不同会造成解密不完全、乱码等，需要初始向量的表现形式)

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

//6. des-ecb
function desEcbEncrypt(plaintext, key) {
    key = new Buffer(key.substr(0, 8))
    var cipher = _crypto.createCipheriv('des-ecb', key, new Buffer(0));
    cipher.setAutoPadding(true)
    var ciph = cipher.update(plaintext, 'utf8', 'base64');
    ciph += cipher.final('base64');
    return ciph;
}

function desEcbDecrypt(plaintext, key) {
    key = new Buffer(key.substr(0, 8))
    var cipher = _crypto.createDecipheriv('des-ecb', key, new Buffer(0));
    cipher.setAutoPadding(true)
    var ciph = cipher.update(plaintext, 'base64', 'utf8');
    ciph += cipher.final('utf8');
    return ciph;
}

//7. md5
function md5(Str) {
    var md5sum = _crypto.createHash('md5')
    md5sum.update(new Buffer(Str))
    return md5sum.digest('hex')
}

function md5to16(Str) {
    let res = md5(Str)
    return res.substring(8, 24)
}

//8. dec
function encrypt(plaintext, key) {
    var ub = Crypto.charenc.UTF8.stringToBytes(plaintext)
    var kb = Crypto.util.base64ToBytes(key)
    var eb = Crypto.AES.encrypt(ub, kb, {asBytes: true, mode: mode})
    return Crypto.util.bytesToBase64(eb)
}

function decrypt (ciphertext, key) {
    var eb = Crypto.util.base64ToBytes(ciphertext)
    var kb = Crypto.util.base64ToBytes(key)
    var ub = Crypto.AES.decrypt(eb, kb, {asBytes: true, mode: mode})
    return Crypto.charenc.UTF8.bytesToString(ub)
}

function generateKey (buffer) {
    if (buffer) return Crypto.util.bytesToBase64(buffer)
    return Crypto.util.bytesToBase64(Crypto.util.randomBytes(16))
}

function generateEpubKey(chapterName) {
    let key = md5to16(md5(`${config.epubCrypto.md5_32.key}${chapterName}`) + `${config.epubCrypto.md5_16.key}`)
    let IV = md5to16(md5(`${config.epubCrypto.md5_32.IV}${chapterName}`) + `${config.epubCrypto.md5_16.IV}`)
    return IV + key
}

function encryptEpub(key) {
    return _crypto.createCipher('aes128', key)
}

function decryptEpub(key) {
    return _crypto.createDecipher('aes128', key)
}

function decipher(ciphertext) {
    let decip = _crypto.createDecipheriv(algorithm, aesKey, aesIv)
    return decip.update(ciphertext, 'base64', 'utf8') + decip.final('utf8')
}

function cipher(data) {
    let cip = _crypto.createCipheriv(algorithm, aesKey, aesIv)
    return cip.update(data, 'utf8', 'base64') + cip.final('base64')
}

function dictSort(obj) {
    const sorted = Object.keys(obj).sort();
    let str = '';
    sorted.forEach((key) => str += obj[key]);
    return str;
}

function decipherIv (ciphertext, aesKey, aesIv) {
    let decip = _crypto.createDecipheriv(algorithm, aesKey, aesIv)
    return decip.update(ciphertext, 'base64', 'utf8') + decip.final('utf8')
}

function cipherIv (plaintext, aesKey, aesIv) {
    let cip = _crypto.createCipheriv(algorithm, aesKey, aesIv)
    return cip.update(plaintext, 'utf8', 'base64') + cip.final('base64')
}

function decipherHexIv (ciphertext, aesKey, aesIv) {
    let decip = _crypto.createDecipheriv(algorithm, aesKey, aesIv)
    return decip.update(ciphertext, 'hex', 'utf8') + decip.final('utf8')
}

function cipherHexIv(plaintext, aesKey, aesIv) {
    let cip = _crypto.createCipheriv(algorithm, aesKey, aesIv)
    return cip.update(plaintext, 'utf8', 'hex') + cip.final('hex')
} 

// 拼接请求字符串并加密
function hmacSHA256 (content, appKey) {
    return cryptoJS.enc.Hex.stringify(cryptoJS.HmacSHA256(content, appKey));
}

//9. AES解密 
function aesDecrypt(content, keys, ivs) {
    const key = cryptoJS.enc.Utf8.parse(keys);
    const iv = cryptoJS.enc.Utf8.parse(ivs);
    const encryptedHexStr = cryptoJS.enc.Hex.parse(content);
    const srcs = cryptoJS.enc.Base64.stringify(encryptedHexStr);
    const decrypt = cryptoJS.AES.decrypt(srcs, key, {
        iv: iv,
        mode: cryptoJS.mode.CBC,
        padding: cryptoJS.pad.Pkcs7
    });
    const decryptedStr = decrypt.toString(cryptoJS.enc.Utf8);
    return decryptedStr.toString();
}