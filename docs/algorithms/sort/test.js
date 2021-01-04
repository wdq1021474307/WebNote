const { insertSort } = require('./insert.js');
const { selectSort } = require('./select.js');

function test(nums){
    // insertSort(nums);
    selectSort(nums)
    console.log(nums);
}

test([7,5,3,1,2,9]);