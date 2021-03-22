function qsort(arr){
    if (Array.isArray(arr)) {
        if (arr.length <= 1) {
            return arr
        }
        let index = Math.floor(arr.length / 2)
        let pivot = arr.splice(index, 1)[0]
        let left = []
        let right = []
        for(let i = 0; i < arr.length; i++) {
            if (arr[i] <= pivot) {
                left.push(arr[i])
            } else {
                right.push(arr[i])
            }
        }
        return qsort(left).concat([pivot], qsort(right))
    } else {
        throw new Error('请传递一个数组')
    }
}
console.log(qsort([123,34,5123]));