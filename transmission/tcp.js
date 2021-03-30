const net = require('net');

var server = net.createServer([options],[connectionListener])
/*options：false当TCP服务器接收到客户端发送的一个FIN包时将会回发一个FIN包
		   true当TCP服务器接收到客户端发送的一个FIN包时将不会回发FIN包，这使得TCP服务器可以继续向客户端发送数据，但不会继续接收客户端发送的数据。来发者必须调用end方法来关闭socket连接。默认为false
connectionListener：指定当客户端与服务器端简历连接时所要调用的回调函数*/
function S(socket){
	//回调函数代码
}
//参数值为TCP服务器监听的socket端口对象