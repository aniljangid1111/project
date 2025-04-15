const names = ['arjuna', 'ravidas', 'siddhartha', 'uttam'];

const vowels = ['a', 'e', 'i', 'o', 'u'];

let ans = [];

for(let i = 0; i < names.length; i++) {
    let cuurentName = names[i];
    if(vowels.includes(cuurentName[0]) && cuurentName.length > 5) {
        ans.push(cuurentName)
    }
};

console.log(ans)