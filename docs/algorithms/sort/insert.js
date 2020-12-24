/**
 * 插入排序
 * @module sort
 * @params nums {Array} 要进行排序的数组
 */
function insertSort(nums) {
    const n = nums.length;
    for (let i = 1; i < n; i++) {
        for (let j = i; j > 0 && nums[j] < nums[j-1]; j--) {
            exchange(nums, j, j-1)
        }
    }
}

/**
 * 交换两个元素
 */
function exchange(nums, i, j) {
    const t = nums[i];
    nums[i] = nums[j];
    nums[j] = t;
}

function test(nums){
    insertSort(nums)
    console.log(nums);
}

test([7,5,3,1,2,9])
