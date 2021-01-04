const { exchange } = require('./common.js');
/**
 * 插入排序
 * @params nums {Array} 要进行排序的数组
 */
function insertSort(nums) {
    const n = nums.length;
    for (let i = 1; i < n; i++) {
        for (let j = i; j > 0 && nums[j] < nums[j - 1]; j--) {
            exchange(nums, j, j - 1)
        }
    }
}

exports.insertSort = insertSort;