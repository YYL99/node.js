const crypto = require("crypto");
var fs = require('fs');
//const secret = crypto.randomBytes(32); // 密钥
const secret = "I".repeat(32);
//const content = "hello world!"; // 要加密的明文
const content = fs.readFileSync('./file.txt', 'utf8');//后续程序导致只能16个字节

//加密模块
const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    secret,
    Buffer.alloc(16, 0)
);
cipher.update(content, "utf8");
const miwen = cipher.final("hex");

const net = require('net');
const port = 8080;
const host = '127.0.0.1';
const client= new net.Socket();
//创建socket客户端
client.setEncoding('binary');
//连接到服务端
client.on('data',function(data){
  console.log('from server:'+ data);
  //得到服务端返回来的数据
});
client.connect(port,host,function(){
  client.write('hello server');
  //向端口写入数据到达服务端
  client.on('data',function(data){
    //如果连接成功则传输密文
    if (data == 'Hello client!'){
      client.write(miwen);
    }
  }); 
});

client.on('error',function(error){
//错误出现之后关闭连接
  console.log('error:'+error);
  client.destory();
});
client.on('close',function(){
//正常关闭连接
  console.log('Connection closed');
});


