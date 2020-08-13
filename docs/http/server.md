# 服务器

在通信过程中所涉及的应用程序,  Node.js开发者可以用[Node.js](https://nodejs.org/docs/latest-v13.x/api/http.html)提供的HTTP核心模块创建的服务

    const http = require('http');
    const server = http.createServer( (req,res) => {} ).listen(port)

一般的Java开发者是将自己的项目打包成War包，放入Tomcat下的webapp目录下运行

![](../../images/2020-08-05-11-13-43.png)