// for(let s=o;s<arr2.length;s++){

// }

let arr1 = [1, 211, 4, 5, 6, 100, 6];
let min = arr1[0]
let max = arr1[0]
for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] < min) {
        min = arr1[i];
    }
    if(arr1[i]> max){
        max=arr1[i];
    }
    
}
console.log('min value', min)
console.log('max value', max)