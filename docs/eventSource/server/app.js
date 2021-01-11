const http = require('http');
const fs = require('fs');
const path = require('path');
const server = http.createServer((req, res) => {
    // 由服务端发送 index.html，确保同源，避免要处理跨域的问题
    if (req.url === '/index' || req === '/index.html') {
        const file = fs.createReadStream(path.resolve(__dirname, '..', 'client') + '/index.html');
        res.writeHead(200, { 'Content-Type': 'text/html;charset=UTF-8' })
        file.pipe(res);
    } 
    // 推送 eventSource 消息
    if (req.url === '/test') {
        // Content-Type 需要设置为 text/event-stream
        res.writeHead(200, { 'Content-Type': 'text/event-stream' });
        // event 字段后跟一个 \n，data 字段后跟两个 \n，这是必需的，代表着当前消息体发送完毕
        const packet = 'event: test\ndata:{"message":"Test a Event Source"}\n\n';
        res.write(packet);
        res.end();
    }
})
server.listen(3000);