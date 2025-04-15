const array1 = [1, 2, 3, 4, 5];
const array2 = [3, 4, 6, 7];

const difference = array1.filter(num => !new Set(array2).has(num));

console.log(difference);
