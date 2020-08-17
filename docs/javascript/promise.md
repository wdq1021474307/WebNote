# Promise
Promise的构造函数接收一个参数**executor**，promise是一个具有**三种状态**的对象

|状态名|含义|
|--|--|
|pending|初始状态，既不代表成功，也不代表失败|
|fulfilled|代表操作成功|
|rejected|代表操作失败|

Promise对象从pending状态变为fulfilled状态时传递一个值给处理方法（handler），也可以变为rejected状态并传递失败信息。当Promise状态发生变化时，then方法绑定的函数就会被调用（参数一：onfulfilled，参数2：onrejected），根据不同的状态调用不同的参数。

*注意：*
当executor函数中抛出一个异常时，状态也会从pending变为rejected。`Promise.prototype.then`和`Promise.prototype.catch`都会返回Promise对象，也就意味着我们可以进行**链式调用**

## Promise对象的创建
通常我们使用关键字new搭配Promise构造函数来创建一个Promise对象

    let promise1 = new Promise( (resolve,reject) => {
        // 操作成功，调用resolve改变promise对象的状态，并且返回一个值
        // resolve(value);
        // 操作失败，调用reject函数改变promise对象的状态，并且返回错误原因
        // reject(reason);
        // 注意：promise对象只会从pending状态改变为fulfilled或者rejected
    } )


## executor
executor是一个带有resolve和reject两个*函数类型*的参数的函数。
