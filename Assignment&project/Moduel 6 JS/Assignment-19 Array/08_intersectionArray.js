const array1 = [1, 2, 3, ,5,,6,4];
const array2 = [3, 4, 5, 6];

const intersection = array1.filter(num => new Set(array2).has(num));

console.log(intersection);
