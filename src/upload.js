const http = require('http');
const fs = require('fs');

function upload(fileStream) {
  //生成分隔数据
    var boundaryKey = '----WebKitFormBoundaryjLVkbqXtIi0YGpaB'; 
  var options = {
    host: 'localhost', //远端服务器域名
    port: 3000, //远端服务器端口号
    method: 'POST',
    path: '/upload', // 上传服务路径
  };
  // var req = http.request(options, function(res) {
  //   res.setEncoding('utf8');
  //   fileStream.pipe(req, { end: false });
  //   res.on('data', function(chunk) {
  //     console.log('body: ' + chunk);
  //   });
  //   res.on('end', function() {
  //     console.log('res end.');
  //   });
  // });
  // req.write(
  //   '–' + boundaryKey + '\r\n' +
  //   'Content-Disposition:form-data;name="upload";filename="test.zip"\r\n' +
  //   'Content-Type:application/x-zip-compressed\r\n\r\n'
  // );

  // //设置1M的缓冲区
  
  // fileStream.on('end', function() {
  //   req.end('\r\n–' + boundaryKey + '–');
  // });
   fs.readFile('./README.md', function (err, data) {
    //拼装分隔数据段
    var payload = '--' + boundaryKey + '\r\n' + 'Content-Disposition:form-data; name="myfile"; filename="upload.txt"\r\n' + 'Content-Type:text/plain\r\n\r\n';
    payload += data;
    payload += '\r\n--' + boundaryKey + '--';
    
    //发送请求
    var req = http.request(options, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('body:' + chunk);
        });
    });
    
    req.on('error', function(e) {
        console.error("error:"+e);
    });
    //把boundary、要发送的数据大小以及数据本身写进请求
    req.setHeader('Content-Type', 'multipart/form-data; boundary='+boundaryKey+'');
    req.setHeader('Content-Length', Buffer.byteLength(payload, 'utf8'));
    req.write(payload);
    req.end();
});
}

module.exports = upload;
