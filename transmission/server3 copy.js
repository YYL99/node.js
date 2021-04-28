const crypto = require("crypto");
const net = require('net');
const listenPort = 8080;
const server = net.createServer(function(socket){
  console.log('connect: ' +
    socket.remoteAddress + ':' + socket.remotePort);
  socket.setEncoding('binary');
  socket.write('Hello client!');
  socket.on('data',function(data){
    if (data == 'hello server'){
      console.log('client send:' + data);
    }
    else if (typeof data == 'object'){
      const privateKey = data;
    }
    else{
      const miwen = data;
    }
  });
  console.log('client send:' + miwen);
  const d = new Buffer.from(miwen, 'base64');
  const decodeData = crypto.privateDecrypt(privateKey, d);
  const jiemi = decodeData.toString("utf8");
  console.log('client send:' + jiemi);

  socket.on('error',function(exception){
    console.log('socket error:' + exception);
    socket.end();
  });
  socket.on('close',function(data){
    console.log('client closed!');
  });
}).listen(listenPort);
server.on('listening',function(){
  console.log("server listening:" + server.address().port);
});
server.on("error",function(exception){
  console.log("server error:" + exception);
});