let str = "hello";
let arr = str.split(""); // Convert string to array
let result = arr.find(char => arr.indexOf(char) === arr.lastIndexOf(char));

console.log(result); // Output: "h"
