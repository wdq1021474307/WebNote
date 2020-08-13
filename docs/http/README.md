# HTTP简介

HTTP是一种处于应用层的通讯协议, 是一种C/S协议, 通过TCP或者是加密的TCP(TLS)来发送.

在大多数情况下，请求(Request)通过浏览器(Browser)[用户代理(User agent)](../../docs/http/user-agent.md)来发送.

[服务器(Server)](../../docs/http/server.md)可以处理传入的请求，并返回一个消息（Response），在Request和Response之间还有许多的代理们（proxies），比如网关，缓存.

## HTTP基本性质

- 简单

HTTP协议被设计为简单易读的

- 可扩展

HTTP/1.0中出现的HTTP headers可以让协议扩展变得很容易, 只要服务端和客户端在headers上达成一致, 新功能就可以轻松加入进来.

- 无状态, 有会话

在同一个连接中, 两个执行成功的请求之间是没有关系的. 
我们可以使用cookie, 将cookie添加到头部中, 创建一个会话可以让每次请求都能共享相同的上下文信息, 达成相同的状态.

- HTTP和连接

HTTP是应用层的协议, 其连接需要传输层来控制, 在传输层有两个常用的协议, HTTP需要可靠的、不丢失消息的连接