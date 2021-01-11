# EventSource

一种服务端主动向客户端推送消息的规范，一个`EventSource`实例开启一个持久化的 HTTP 连接，发送`Content-Type`为`text/event-stream`的事件，直到要求关闭为止。

**例如：** 客户端主动调用 `eventSource.close()` 方法

**注意：** EventSource 和 WebSocket不同，数据是单向的，只能从服务端往客户端推送数据。

## event stream 的格式

|名称|含义|
|--|--|
|event|消息名称|
|data|消息体|
|id|当前消息标识符|
|retry|重连间隔时间|

这里需要注意的是：event 后面需要跟一个 \n，而在 data 后面需要跟两个 \n，表示当前消息体发送完毕，不用等待后面数据的到来再触发事件，id字段基本上没有使用。

    `event:${event}\ndata:${data}\n\n`

## 运行代码实例

    cd ./server
    node app.js
    通过浏览器访问 http://localhost:3000/index
    打开控制台即可看到来自服务端的消息




