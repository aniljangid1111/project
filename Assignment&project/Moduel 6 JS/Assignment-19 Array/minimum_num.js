let a = [15, 25, 8, 90, 51, 50];
let max = a[0];
let min = a[0];
for (let i = 0; i < a.length; i++) {
    if (max < a[i]) {
        max = a[i];
    }
    if (min > a[i]) {
        min = a[i];
    }
}
console.log("Largest number =>", max);
console.log("Minimum Number=>",min)