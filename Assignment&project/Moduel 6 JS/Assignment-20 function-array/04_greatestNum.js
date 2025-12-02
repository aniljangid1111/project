function findGreatestNumber(arr) {
    let greatest = arr[0]; // Assume first element is the greatest

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > greatest) {
            greatest = arr[i]; // Update greatest if a larger number is found
        }
    }
    return greatest;
}

// Example usage:
let numbers = [5, 2, 8, 1, 9, -3, 7];
let greatestNumber = findGreatestNumber(numbers);

console.log("Greatest Number:", greatestNumber);
