# Babel

## @bebel/core
从名字我们就可以看出，这个包是 babel 的核心，它负责调度 babel 的各个组件进行代码编译。

这个包中有一个`transform()`方法，它调用了`transformFileRunner()`进行文件编译，在编译之前，通过`loadConfig()`读取完整的配置信息，然后读取文件代码并根据配置信息进行编译。

### 生成配置

需要注意的是，在 babel 中，真正做事的实际上是 `plugin`。随着 `plugin` 的增多，管理也变得麻烦起来，于是 babel 提供了 `preset` 预设，每一个 `preset` 都是 plugin 的集合。

babel 解析配置时，`preset` 中较新的语法会被`unshift()`方法添加到队列的首部，意味着较新的语法会先被解析为 ES6 语法，然后将 ES6 语法解析为 ES5语法；而我们在配置文件中定义的 `plugins` 优先级会更高，`preset` 中的 `plugin` 处理完毕后，又将我们定义的 `plugins` 插入到队列的头部。

最终生成的是一个包含`options`和`passes`属性的对象。`options.plugins`包含着插件
集合，`options.preset`大部分情况下是个空数组。`passes`和`options.passes`内容一致。

### 执行编译
babel 生成配置后，接下来使用`fs.readFile(fileName, charset)`方法读取需要进行编译的`js`文件，获取源代码。

获取源代码后，使用`normalizeFile()`方法将源代码解析成 AST。

    const file = yield* normalizeFile(
        config.passes,
        normalizeOptions(config),
        code,
        ast,
    );

    const opts = file.opts;
    try {
        yield* transformFile(file, config.passes);
    } catch (e) {
        ...
    }
紧接着将`options.passes`和`normailizeFile()`方法的返回值传入`transformFile()`方法中，这个方法会根据传入的插件对 AST 进行修改。

之后，使用`generateCode()`方法，将修改之后的 AST 又转换成代码。

这样就完成了编译，大体上可以分为解析（parse），转换（transform），生成（generate）三个过程。

#### 解析 parse
由 `@babel/parse` 包负责将 JS 代码转换成 AST

#### 转换 transform
由 `@babel/traverse` 包使用 visitor 访问者模式并根据插件定义遇到特定的节点进行特定的操作。

Babel 采用的是『深度优先遍历』的方式对 AST 进行遍历

##### babel 插件结构
Babel 返回一个`Function`，入参为 babel 对象

    module.exports = (babel) => {
        return {
            // 进入 AST 触发
            pre(path) {
                this.runtimeData = {}
            }
            // 定义了在树中获取具体节点的方法
            vistor: {},
            // 离开 AST 触发
            post(path) {
                delete this.runtimeData
            }
        }

    }


#### 生成 generate
`@babel/generator`包提供了一个默认的`generate()`方法，我们可以通过插件的`generatorOverride()`方法自定义生成 code

## Babel 的 AST 生成
AST 抽象语法树，计算机通过一系列规则将源代码解析成一棵树，比起直接修改源代码，操作 **树** 这种数据结构要方便得多。

需要注意的是，AST 并不是 Babel 所特有的。

### Babel 所使用的 AST 规范
Babel 所使用的的 AST 规则基于大佬们创建的 [ESTree 项目](https://github.com/estree/estree)

AST 中的每一个节点，都包含一个 Type 属性，这个属性标识了节点的类型。如（FunctionDeclaration，Identifier）

### 词法分析
词法分析由 `@babel/paser` 提供，我们可以将词法分析理解为“分词”，将源代码分割为一个个成为 Token 的东西，如 `a = 1`
可以分为[a, =, 1]。

Babel 中 tokenizer 使用了大量的 switch case 语句做这件事。

词法分析的目的是得到一系列 Token。

### 语法分析
语法分析同样由 `@babel/paser` 提供

解析一条语句需要借助词法分析产生的 Token

语法分析的结果就是 AST

Babel 根据不同的 Type 值为节点添加一些额外的属性。

语法分析相对于词法分析要难得多，因为语法分析要考虑许多运算符的优先级和结合性等。

#### 处理运算符的优先级
如表达式 `const a = 1 + 2 * 3`，生产的 AST 节点如下：
    
    "init": {
        "type": "BinaryExpression",
        "left": {
            "type": "Literal",
            "value": 1,
        },
        "operator": "+",
        "right": {
            "type": "BinaryExpression",
            "left": {
            "type": "Literal",
            "value": 2,
            },
            "operator": "*",
            "right": {
            "type": "Literal",
            "value": 3,
            }
        }
    }

内层的节点以更高的优先级进行计算，在执行过程中，程序能够根据这些规则和递归关系得到结果。


## 参考资料：
- [Babel编译流程分析](https://zhuanlan.zhihu.com/p/296970431)
- [Babel AST 生成之路](https://zhuanlan.zhihu.com/p/308509323)
- [初学 Babel 工作原理](https://zhuanlan.zhihu.com/p/85915575)