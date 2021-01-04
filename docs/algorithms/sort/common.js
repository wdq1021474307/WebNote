/**
 * 原地交换两个元素
 * @params nums 要进行交换元素（Element）的数组（Array）
 * @params 一个要进行交换的元素的索引
 * @params 另一个要进行交换的元素的索引
 */
exports.exchange = (nums, i, j) => {
    const t = nums[i];
    nums[i] = nums[j];
    nums[j] = t;
}