# DIV 水平垂直居中
---

适当安排一些反例能帮助人们注意先前没有注意的新特征，了解哪些特征与某些特定概念相关或无关。—— 《人是如何学习的 大脑、心理、经验及学校》

---

## 一、使用绝对定位进行水平居中
### （一）不知道当前元素的具体的宽度 (width) 和高度 (height)
#### 方法一
1. 设置当前元素的父元素的 position 属性为 relative
2. 设置当前元素的 position 属性为 absolute
3. 设置当前元素的 top left 属性为 50%
4. 设置当前元素 transform 为 translate(-50%,-50%)

#### 方法二
1. 设置当前元素的父元素的 position 属性为 relative
2. 设置当前元素的 position 属性为 absolute
3. 设置当前元素的 top right bottom left 属性为 0
4. 设置当前元素的 margin 属性为 auto

### （二）已知当前元素具体的宽度和高度
1. 设置当前元素的父元素的 position 属性为 relative
2. 设置当前元素的 position 属性为 absolute
3. 设置 margin-left, margin-top 为当前元素 width height 属性的一半的负值

## 二、使用 Flex