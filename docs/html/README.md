# HTML简介
HTML是一种标记语言，全称为超文本标记语言（HyperText Markup Language）。

我们使用HTML去定义网页的含义和结构，使用CSS去定义网页的展示效果，使用JavaScript去定义网页的功能和行为。

一个基本的HTML页面结构如下

    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <tilte>My website</title>
    </head>
    <body>
        <p>我是一个段落</p>
    </body>
    </html>

一个HTML由若干元素（Element）组成，上面的`<p>我是一个段落</p>`就是一个HTML元素（HTML Element）。

一个元素可以放在其他元素中，也就是嵌套，比如`<p>我是<em>小明</em></p>`，em元素嵌套在p元素中。

在上述代码中，`<html>`是根元素（root element）。