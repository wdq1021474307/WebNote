# let 和 const 关键字

## let
有Java或是C/C++经验的程序员在使用JavaScript时，可能会认为下面代码中的`i`作用域只存在于for循环中。然而使用`var`关键字声明的变量，其作用域会得到**提升**。

    function printList(arr){
        // 即使i是在for循环中声明的
        // 它在整个printList函数中都可以被访问和使用。
        for(var i = 0; i < arr.length; i++){
            console.log(arr[i]);
        }
        console.log("i="+i);
    }

在ES5，只有函数作用域和全局作用域，这给程序员们带来了很大的不便。在ES6提供了`let`关键字帮助我们去解决这个问题，使用`let关键字`声明的变量，拥有**块级作用域**。

## const 
`const`关键字可用于声明一个**常量**，并且使用`const`关键字声明的变量也拥有**块级作用域**。

使用`const`关键字声明一个变量时，需要同时为其赋值，不能只声明而不赋值。

    const a;
    // 会报错。
