const { exchange }  = require('./common.js');

/**
 * 选择排序
 * @module 选择排序
 * @params nums {Array} 要进行排序的数组
 */
function selectSort(nums){
    for (let i = 0; i < nums.length - 1; i++) {
        for(let j = i + 1; j < nums.length; j++){
            if (nums[j] < nums[i]) {
                exchange(nums, i, j);
            }
        }
    }
}

module.exports.selectSort = selectSort;