function areArraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        console.log("Arrays are not equal.");
        return false;
    }

    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            console.log("Arrays are not equal.");
            return false;
        }
    }
    console.log("Arrays are equal.");
    return true;
}

// Example usage
let array1 = [1, 2, 3];
let array2 = [1, 2, 3];

areArraysEqual(array1, array2); 
