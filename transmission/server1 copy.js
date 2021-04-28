const net = require('net');
const listenPort = 8080;
const server = net.createServer(function(socket){
  console.log('connect: ' +
    socket.remoteAddress + ':' + socket.remotePort);
  socket.setEncoding('binary');
  socket.write('Hello client!');
  socket.on('data',function(data){
    console.log('client send:' + data);
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