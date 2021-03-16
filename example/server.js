var http = require('http');
http.createServer(function (req, res){
    //发送301响应代码，同时发送位置头，使之重定向
    //301永久定向   302临时定向
    res.writeHead(302, {
        'Location': 'http://www.homestarrunner.com/sbsite/'
    });
    res.end();
}).listen(3000, "127.0.0.1");
console.log('Server running at http://127.0.0.1:3000/');