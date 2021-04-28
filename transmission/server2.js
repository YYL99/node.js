const crypto = require("crypto");
const secret = "O".repeat(32);
const decipher = crypto.createDecipheriv(
  "aes-256-cbc",
  secret,
  Buffer.alloc(16, 0)
);
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
    }else{
      console.log('client send:' + data);
      decipher.update(data, "hex");
      const jiemi = decipher.final("utf8");
      console.log('client send:' + jiemi);
    }
  });
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