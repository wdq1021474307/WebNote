function Person(name, age) {
    this.name = name;
    this.age = age;
}

// 函数有作为构造函数的调用形式
// 参考《JavaScript good parts》一书
const ming = new Person('小明', 21);
// 关注点1
console.log('实例对象：', ming.prototype); // -> undefined 
// 关注点2
console.log('构造函数：', Person.prototype);// ->{...省略信息}

console.log(ming.__proto__);
console.log(Object.getPrototypeOf(ming));

const obj = Object.create({});
console.log(obj.__proto__)

function instanceOf(left, right) {
    while (left.__proto__ !== null) {
        if (left.__proto__ === right.prototype) {
            return true;
        }
        left = left.__proto__;
    }
    return false;
}
