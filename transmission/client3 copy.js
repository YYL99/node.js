/*# 生成私钥
openssl genrsa -out privatekey.pem 1024
# 生成公钥
openssl rsa -in privatekey.pem -pubout -out publickey.pem
*/
const crypto = require("crypto");
var fs = require('fs');
const publicKey = fs.readFileSync("./publickey.pem");
const privateKey = fs.readFileSync("./privatekey.pem");
const content = fs.readFileSync('./file.txt', 'utf8');
console.log(content);
const encodeData = crypto.publicEncrypt(publicKey, Buffer.from(content));
const miwen = encodeData.toString("base64");
console.log(miwen);
const net = require('net');
const port = 8080;
const host = '127.0.0.1';
const client= new net.Socket();
client.setEncoding('binary');
client.on('data',function(data){
  console.log('from server:'+ data);
});
client.connect(port,host,function(){
  client.write('hello server');
  client.on('data',function(data){
    if (data == 'Hello client!'){
      client.write(miwen);
      client.write(privateKey);
    }
  }); 
});
client.on('error',function(error){
  console.log('error:'+error);
  client.destory();
});
client.on('close',function(){
  console.log('Connection closed');
});


