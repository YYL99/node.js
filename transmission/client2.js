const crypto = require("crypto");
var fs = require('fs');
const secret = "O".repeat(32);
const content = fs.readFileSync('./file.txt', 'utf8');
console.log(content);
const cipher = crypto.createCipheriv(
  "aes-256-cbc",
  secret,
  Buffer.alloc(16, 0)
);
cipher.update(content, "utf8");
const miwen = cipher.final("hex");
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


