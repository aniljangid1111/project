function findLowestNumber(arr) {
    let lowest = arr[0];

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < lowest) {
            lowest = arr[i]; 
        }
    }
    return lowest;
}

// Example usage:
let numbers = [5, 2, 8, 1, 9, -3, 7,-100];
let lowestNumber = findLowestNumber(numbers);

console.log("Lowest Number:", lowestNumber);
