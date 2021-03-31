# JavaScript 事件委托

## 目的
使用事件委托的目的是避免将事件监听器添加到特定的节点上。转而将事件监听器添加到一个父节点上，事件监听器分析冒泡事件去查找匹配项进行响应。

## 相关知识点
- [matches](https://developer.mozilla.org/en-US/docs/Web/API/Element/matches)
- [事件冒泡](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Building_blocks/Events)


## 代码实例

    document.getElementById("parentNode").addEventListener("click", function(e) {
        if (e.target && e.target.matches("a.classA")) {
            console.log("单击了带有 classA 类的 a 标签")
        }
    })