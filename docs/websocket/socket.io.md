# socket.io
socket.io是一个js库，他为我们提供了客户端与服务端的全双工通信功能。

socket.io分别提供了客户端API和服务端API

## 客户端API
我们想要在客户端使用socket.io，首先我们先引入“socket.io”js库。

    <script src="/socket.io/socket.io.js"></script>
    let socket = io.connect();



## 服务端API
socket.io库导出了一个`Server`函数对象，我们可以调用`Server`函数并传递一个`http.server`对象或者**端口号**，以便于服务端去监听。

也可以使用在实例化之后，调用Server原型链（Server.prototype）中的`listen和attach`函数去监听一个`http.server`或者**端口号**。

    // 通常将Socket.io库导出的函数对象命名为io，大概是因为socket.io这个名字的缘故吧。
    // 这里需要显式的调用Server构造函数
    let io = require("socket.io")();
    // 使用node.js核心模块http创建的http服务器，监听的端口号为3000
    let server = require("http").createServer(3000,() => {});
    // 指定端口号监听
    // io.listen(3000);
    // 指定Server对象进行监听
    io.listen(server)