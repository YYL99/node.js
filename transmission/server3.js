/*# 生成公钥
openssl rsa -in privatekey.pem -pubout -out publickey.pem
*/
const crypto = require("crypto");
const fs = require("fs");
const privateKey = fs.readFileSync("./privatekey.pem");

const net = require('net');
//模块引入
const listenPort = 8080;//监听端口
const server = net.createServer(function(socket){
  // 创建socket服务端
  console.log('connect: ' +
    socket.remoteAddress + ':' + socket.remotePort);
  socket.setEncoding('binary');
  socket.write('Hello client!');
  //接收到数据,对数据进行解密
  socket.on('data',function(data){
    //console.log('client send:' + data);
    if (data == 'hello server'){
        console.log('client send:' + data);
    }else{
        //console.log('client send:' + data);
        const d = new Buffer.from(data, 'base64');
        const decodeData = crypto.privateDecrypt(privateKey, d);//解密模块
        const jiemi = decodeData.toString("utf8");
        //socket.write(jiemi);
        console.log('client send:' + jiemi);
    }
  });
  

 // socket.pipe(socket);
  //数据错误事件
  socket.on('error',function(exception){
    console.log('socket error:' + exception);
    socket.end();
  });
  //客户端关闭事件
  socket.on('close',function(data){
    console.log('client closed!');
     // socket.remoteAddress + ' ' + socket.remotePort);
  });
}).listen(listenPort);
//服务器监听事件
server.on('listening',function(){
  console.log("server listening:" + server.address().port);
});
//服务器错误事件
server.on("error",function(exception){
  console.log("server error:" + exception);
});