# Vue.js 中的插槽 slot


## 理解 $slots 和 $scopedSlots

    // Test.vue
    <template>
        <div class="hello">
        <slot name="header"></slot>
        <slot :test="test"></slot>
        <slot name="footer"></slot>
    </div>
    </template>

    <script>
        export default {
        name: "Test",
        data(){
            return {
                test: {
                    name: 'test[name]'
                }
            }
        },
        mounted() {
            console.log('slots',this.$slots)
            console.log('$scopedSlots',this.$scopedSlots)
        }
    }
    </script>

    
    // HelloWorld.vue
    <template>
    <div class="hello">
        <my-test>
            <template #header>
                <div>header</div>
            </template>
            <template #default="{ test }">
                <div>{{ test.name }}</div>
            </template>
            <template #footer>
                <div>footer</div>
            </template>
        </my-test>
    </div>
    </template>

    <script>
    import Test from './Test'
    export default {
        name: 'HelloWorld',
        components: {
            'my-test': Test
        }
    }
    </script>

输出结果

![](https://gitee.com/wdq937/note-pic/raw/master/img/20210220180522.png)

通过观察控制台的打印输出和阅读 Vue官方文档，我们可以发现，$slots 并不包含作用域插槽，而 $scopedSlots 包含了所有的插槽。

$slots 和 $scopedSlots 都返回一个对象，不同的是 $slots 返回的对象中的值是 VNode 数组，而 $scopedSlots 返回的对象中的值都是函数，该函数传递一个 Props 返回一个 VNode 数组。

需要注意的是 $scopedSlots 在 Vue 2.6以上发生了变化。在 2.6 之前，$scopedSlots 总是只返回作用域插槽。旧版本的作用可以查看[这篇文章](https://blog.csdn.net/guzhao593/article/details/89219229)。

这两个 API 主要用于 [渲染函数（Render）](https://cn.vuejs.org/v2/guide/render-function.html)。