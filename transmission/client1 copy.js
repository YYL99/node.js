const crypto = require("crypto");
var fs = require('fs');
const content = fs.readFileSync('./file.txt', 'utf8');
console.log(content);
function sha1Sign(src) {
    const sha1 = crypto.createHash('sha1');
    sha1.update(src);
    return sha1.digest('hex').toString();
}
const miwen = sha1Sign(content);
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
  //client.destory();
});
client.on('close',function(){
  console.log('Connection closed');
});