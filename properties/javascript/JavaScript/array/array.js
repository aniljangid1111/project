// let arr = [2, 1, 3, 5, 77, 100, 500, 5];
// console.log(arr.push(600));
// console.log(arr.shift());
// console.log(arr);
// // console.log(arr[0]);
// let min = arr[0];
// let max = arr[0];
// for (let i = 0; i < arr.length; i++) {
//     if (arr[i] < min) {
//         min = arr[i];
//     }
//     if (arr[i] > max) {
//         max = arr[i]
//     }
// }

// console.log('minimum value-->', min);
// console.log('maximum value-->', max);
let arr1 = [6,1, 2, 3, 4, 5];
let arr2 = [ ];
let min=arr1[0];
for (let i = 0; i < arr1.length; i++) {
    if(arr1[i]<min){
        min=arr1[i];
        arr2=i;
    }
    // for(let s=o;s<arr2.length;s++){
        
    // }
  
}
console.log(min);
