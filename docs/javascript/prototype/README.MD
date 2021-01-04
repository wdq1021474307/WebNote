# 继承和原型链

JavaScript 是基于原型的语言，即使 在 ES6 中提供了 `class` 关键字，但它只是个语法糖而已。

每一个实例对象有个 `__proto__` 属性指向它的构造函数的原型对象 **prototype**。这个原型对象也有自己的原型对象 (`__proto__`)，直到 `null`。

类似于 Java 的单根继承，JavaScript 中的几乎所有对象都是基于 `Object.prototype` 的

---
注意：`__proto__` 是一个非标准但是被许多浏览器实现的属性，不过从 ES6 开始，我们有了一个标准的属性，可以通过 `someObject.[[prototype]]`访问`someObject`的原型，等同于 `__proto__`。我们通过`Object.getPrototypeOf(someObject)`去访问`someObject.[[prototype]]`属性

我们可以通过 `__proto__ in {}` 判断当前环境是否支持 `__proto__` 这个属性


## 实践一下
我使用的浏览器是 Microsoft Edge 版本 87.0.664.66。打开浏览器 console， 我们键入

    Object.__proto__.__proto__.__proto__ // -> null
    // 实际上是这样的遍历过程，Function.prototype -> Object.prototype -> null
    Object.prototype.__proto__ // -> null

    Object.prototype.prototype // -> undefined

定义：`null`就是没有 `[[prototype]]`


## 区分 `__proto__` 和 `prototype`
有过 JavaScript 实践经验的小伙伴们可能知道，我们想要在 JavaScript 中实现 类似于 Java 中 Class 的效果，实际上用的是 function 的写法，我们来看一个示例

    function Person(name, age) {
        this.name = name;
        this.age = age;
    }

    // 函数有作为构造函数的调用形式
    // 参考《JavaScript good parts》一书
    const ming = new Person('小明', 21);
    // 关注点1
    console.log('实例对象：',ming.prototype); // -> undefined 
    // 关注点2
    console.log('构造函数：',Person.prototype);// ->{...省略信息}


    // Java Class写法
    Class Person{
        private String name;
        private int age;
        
        public Person(name, age){
            this.name = name;
            this.age = age;
        }
    }

让我们看看上述代码中的关注点，可以发现我们所讨论的 `prototype` 实际上是针对构造函数而言的，实例对象应该通过下面的写法去访问其构造函数的 `prototype` 属性

    // 非标准
    console.log(ming.__proto__)
    // ES6 后的标准写法，访问的是 ming[[Prototype]]
    console.log(Object.getPrototypeOf(ming))
    // 上面两个的结果都可以得到对 Person.prototype 的指向

## 其他

### 通过 `Object.create()` 方法去创建一个纯净的对象

    const obj = Object.create({});
    console.log(obj.__proto__) // -> {}

### 使用 `Object.create()`方法而不是 `Object.setPrototypeOf()`方法

使用`Object.setPrototypeOf`在各个浏览器和 JavaScript 引擎上都是一个很慢的操作，所以应该避免使用该方法。

### instanceOf 的基本实现
遍历 left 的原型链直至 null 都和 right.prototype 不相等说明 false

    function instanceOf(left, right){
        while (left.__proto__ !== null) {
            if (left.__proto__ === right.prototype) {
                return true;
            }
            left = left.__proto__;
        }
        return false;
    }