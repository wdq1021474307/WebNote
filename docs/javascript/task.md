# JavaScript任务

### 任务类型
JavaScript任务可以分为同步任务、微任务和宏任务三个类型，不同类型的任务有着不同的优先级。

### 任务优先级

|任务类型|优先级|
|--|--|
|同步任务|1|
|微任务|2|
|宏任务|3|

JavaScript在运行时是**单线程**的。

JavaScript在执行任务时，有一块自己的工作区，用来处理当前的任务队列，同步任务会直接放入工作区进行处理，工作区任务处理完毕后**先查看微任务队列**，如果微任务队列中有任务，则把其中的任务添加到工作区进行处理，**然后查看宏任务队列**，如果宏任务队列中有任务，则将宏任务队列中的任务添加到工作区进行处理。

如果JavaScript没有任务进行处理，就会进入休眠状态，等待新任务的到来。

我们可以用一个代码实例来验证这个过程，毕竟实践是检验真理的唯一标准。

    // 宏任务
    setTimeout(()=>{
        // 宏任务中的同步代码
        new Promise( resolve => {
            console.log("Timeout promise");
            resolve();
        })
        // 宏任务中的微任务代码
        .then(()=>{
            console.log("Timeout then");
        })
    })
    new Promise(resolve=>{
        // 同步代码
        console.log("promise");
        resolve();
    }).then(()=>{
        // 微任务
        console.log("then");
    })
    // 同步代码
    console.log("同步代码，立即执行");

#### 输出结果：

    promise
    同步代码，立即执行
    then
    Timeout promise
    Timeout then
<hr/>

### 将一个任务分成多个小任务
    let count = 0;
    // 假设一个大的任务量为九百万的数量单位
    let num = 9000000;
    function getValue(){
        // 这里的for循环是一个一次处理一百万数量的小任务
        for(let i=0; i<1000000; i++){
            if(num <= 0) break;
            count = count + num--;
        }
        // 判断大任务是否完成
        if(num>0){
            // 仅作为提示作用
            console.log(num);
            // 再次将小任务添加到宏任务队列中
            setTimeout(getValue);
        }else{
            // 任务结束后的输出，作为提示
            console.log(count);
        }
    }
    // 同步代码1
    console.log("直接输出的语句1");
    getValue();
    // 同步代码2
    console.log("直接输出的语句2");


#### 输出结果：
    直接输出的语句1
    8000000
    直接输出的语句2
    7000000
    6000000
    5000000
    4000000
    3000000
    2000000
    1000000
    40500004500000
    30375002250000


#### 这里为什么要这样做
首先我们观察整段代码，*同步代码1*处于`getValue();`执行前，这一条输出语句会直接执行，但是同步代码2处于`getValue();`执行后，如果不将这个大任务拆分成多个小任务，那么*同步代码2*会等待`getValue();`完全执行完成后才会被执行，也就是说`getValue();`会阻塞*同步代码2*的执行。

当我们拆分成多个小任务之后，第一个小任务完成后，*同步代码*就得到了执行。

#### 使用Promise微任务去处理一个复杂的计算

    async function getValue2(num){
        let res = await Promise.resolve().then(()=>{
            let count = 0;
            for(let i = 0; i<num; i++ ){
                if(num<=0) break;
                count += num--;
            }
            return count;
        });
        // 输出计算结果
        console.log(res);
    }
    getValue2(9000000);
    console.log("同步代码的输出");

<hr/>

    let sum = 0;
    for(let i =0; i<9000000; i++){
        sum = sum +i;
    }
    console.log(sum);