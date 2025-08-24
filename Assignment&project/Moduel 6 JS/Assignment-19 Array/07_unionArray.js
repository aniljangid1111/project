const a = [1, 2, 3,4,5];
const b = [3, 4, 5];

const union = [...new Set([...a, ...b])];

console.log(union); 
