# GC 垃圾回收

垃圾收集是美国计算机科学家约翰 · 麦卡锡在 1959 年左右为了简化 Lisp 中的人工内存管理而发明的。

借助垃圾回收器（Garbage Collection），程序员不必再去手动管理内存的分配与释放。

## 基本原则
在程序中找到将来无法访问的数据对象，并回收这些对象使用的资源（计算机的内存资源是有限的）。

## Tracing Garbage Collection 追踪垃圾回收器
由于『Tracing Garbage Collection』是最常见的垃圾回收类型，因此通常我们说 GC，一般指的是『Tracing Garbage Collection』

Chrome V8 引擎的 GC 也是『Tracing Garbage Collection』 

## 基本算法

### naive mark and sweep 朴素标记和清除算法
在该算法中，内存中的每一个对象都保留一个位，用于 GC 使用，主要分为两个阶段：

1. 标记

对整个『root set』进行树遍历，标记每一个可以通过根访问到的对象为『in-use』。

2. 扫描

扫描所有内存，检查标志是否为『in-use]，如果不是，则释放该内存块，否则清除标志，等待下一个 GC 周期。

算法的缺点：

1. GC 期间，整个程序需要挂起，不允许工作集发生变化
2. 必须对整个工作内存进行检查，大部分需要检查两次。

##  tri-color marking 三色标记
在该算法中，创建了三组集合：

1. white set（白色集合）：包含内存回收的候选对象集
2. black set（黑色集合）：可以从『root set』访问，并且这些对象没有引用『white set』的对象。不属于内存回收的候选集。
3. gray set（灰色集合）：可以从『root set』进行访问，但是尚未确定是否引用了『white set』的对象。不属于内存回收的候选集。

算法描述：

初始状态，『black set』为空，『gray set』包含了直接从『root set』引用的对象，而『white set』包含了其他对象。

算法步骤：

1. 从灰色集合中选择一个对象并且移动它到黑色集合中
2. 将它引用的每一个白色对象移动到灰色集合中
3. 重复上面两个步骤，直到灰色集合为空。

当灰色集合为空时，就完成了扫描，此时黑色集合都是我们可以从根进行访问的对象，而白色集合中的对象可以被 GC 掉。

（tri-color invariant）三色不变式：

对象只能从『white set』到『gray set』，从『gray set』到『black set』，保证了一个重要的不变量，没有黑色对象引用白色对象。因此灰色对象为空时，所有的白色对象可以被释放。
