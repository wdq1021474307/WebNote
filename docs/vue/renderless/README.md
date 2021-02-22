# Vue.js 中的 Renderless 组件

> 这篇笔记所参考的文章 [Renderless Components in Vue.js](https://adamwathan.me/renderless-components-in-vuejs/)

Renderless 组件主要使用了 Vue.js 中的插槽（slot）的知识。我们可以先阅读官方的 slot [文档](https://cn.vuejs.org/v2/guide/components-slots.html)。

Renderless 组件，我们一般称为『无渲染组件』。它是一个不渲染自身 HTML 的组件。它只管理状态（state）和行为（behavior）

## 使用场景
1. 想要用户能够轻松自定义组件的外观
2. 组件行为非常相似，只是布局不同

原文中的 slot 和 slot-scope 是官方已经废弃的语法，我们可以使用 `v-slot` 的写法

**旧写法**:

    <!-- Parent/Consumer -->
    <renderless-component-example>
        <h1 slot-scope="{ exampleProp }">
            Hello {{ exampleProp }}!
        </h1>
    </renderless-component-example>

    <!-- Renders: -->
    <h1>Hello universe!</h1>

**新写法**:

    <!-- Parent/Consumer -->
    <renderless-component-example>
        <template #default="{ exampleProp }">
            <h1> Hello {{ exampleProp }}! </h1>
        </template>
    </renderless-component-example>

    <!-- Renders: -->
    <h1>Hello universe!</h1>
