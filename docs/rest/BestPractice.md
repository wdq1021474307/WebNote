# 设计RESTful API的最佳实践

## 1.了解HTTP基础知识

- HTTP具有动词（verbs）或者方法（methods），最常用的有GET、POST、PUT、DELETE、PATCH。另外还有CONNECT、HEAD、OPTIONS、TRACE。
- REST是面向资源的（resource），一个资源由URI进行表示，如`/students/`。
- 一个端点同时包含动词和URI，如`GET: /students/`。
- 一个端点可以解释为对一个资源的操作，例如，`POST: /students/`可以表示为“创建一个学生”。
- 动词可以映射到CRUD操作：GET表示读（Read），POST表示创建（Create），PUT和PATCH表示更新（Update），DELETE表示删除（Delete）。
- 一个响应的状态由它的状态码（status code）进行指定：`1xx`表示信息，`2xx`表示成功，`3xx`表示重定向，`4xx`表示客户端错误，`5xx`表示服务器错误。

## 2.不要返回纯文本数据

最佳实践是返回JSON格式的数据，并且设置响应头部（headers）中的`Content-Type`的值为`application/json;charset=UTF-8`

![](https://gitee.com/wdq937/note-pic/raw/master/img/20201022095922.png)

## 3.避免在URI中使用动词

我们利用HTTP动词去描述对资源的操作，而不是使用动词去命名一个资源。例如我们想要创建一个学生信息

```http
# 应该这样设计
POST: /students/
# 而不是这样
POST: /students/createNewStudent/
```

## 4.使用复数形式的名词

考虑一个问题，客户端想要获取一名学生的信息，服务端的API应该设计成为`/student/:sid/`单数形式还是`/students/:sid/`复数形式呢？

**更好的做法是使用复数形式**

因为这样可以非常好的去适配所有类型的端点。

思考一下

`GET /student/2017100`可以很好的工作，服务端返回学号为2017100的学生信息到客户端，那如果是`GET /student`呢？服务端究竟是返回一个学生的信息呢，还是所有学生的信息呢？

为了避免产生模棱两可的情况，我们在所有的地方都使用复数形式

```http
GET: /students/2017100
POST: /students/
...
```

## 5.在响应体中包含错误的详细信息

当服务端处理一个错误时，如果能在响应体中包含错误的详细信息，那么用户可以方便的去调试，如果能够包含错误的字段，那就更棒了！

```json
{
    "error": "无效的信息",
    "details": {
        "sid": "所提供的的学号格式有误",
    }
}
```

## 6.注意状态码

最糟糕的API设计就是返回状态码为`200 ok`的错误响应

```http
HTTP/1.1 200 OK
Content-Type: application/json;charset=UTF-8

{
	"error": "请至少提供一个item"
}
```

使用这种API设计，破坏了用户和API之间的信任，因为API已经开始对你说谎了。

更良好的设计应该是下面这样的：

```HTTP
HTTP/1.1 400 Bad Request
Content-Type: application/json;charset=UTF-8

{
	"error": "请至少提供一个item"
}
```

## 7.一致地使用状态码

如果你已经掌握了状态码的使用，那么你应该努力一致地去使用它们。

如果你选择POST一个端点返回`201 created`，那么你应该在每个POST请求都返回同样的状态码。

下面是一些例子：

```http
GET: 200 OK
GET: 404 Not found
POST: 201 Created
PUT: 200 OK
PATCH: 200 OK
DELETE: 204 No Content
```

## 8.不要嵌套资源

比如想要获取一名学生需要参加的考试，有些人可能会推荐下面的设计

```http
GET: /students/2017100/exams/
```

这样的设计看上去似乎很好的解决了问题，实际上不够清晰我们要访问的资源究竟是`stduents`还是`exams`

采用`querystring`去直接过滤`exams`资源

```
GET: /exams?sid=2017100
```

这样可以清晰地去表示你要获取学号为2017100的学生要参加的考试资源

## 9.处理尾斜线

URI是否带有尾斜线不是关键点，关键在于我们选择一种并保持一致的写法。

实际上现在大多数Web框架都可以自动妥善地处理URL的尾斜线。

## 10.利用querystring

比如说我们想要分页或是过滤查询学生资源，我们可以利用querystring去做到这一点：

```http
GET: /students?page=1&page_size=30
```

我们可以清晰地知道这是一个对学生资源的查询，并且查询结果是第一页，最大数为30个学生。