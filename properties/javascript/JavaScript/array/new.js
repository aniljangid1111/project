let arr = [1, 2, 3, 4, 5]
arr.push(11)
// console.log(arr)

let rem = [1, 2, 3, 4, 5]
rem.pop()
// console.log(rem)

let shift = [1, 2, 3, 4, 5]
shift.shift()
shift.unshift(400)
// console.log(shift)

let tryy = [1, 2, 3, 4, 5]

tryy.splice(3, 1, 500)//add remove 
// console.log(tryy)

let div = [1, 2, 3, 4, 5]

let nw = div.slice(1, 5)
// console.log(nw)


let finding = [1, 2, 3, 4, 5, 6, 7]

let ans = finding.find(n => n > 4)
// console.log(ans)


let sorting = [5, 2, 6, 7, 1, 3, 8, 4]
sorting.sort((a, b) => a - b)
// console.log(sorting)

// filter 
let num = [1, 4, 3, 2, 5]
// let fil = num.filter(n => n > 2)
// console.log(fil)
let even = num.filter((n) => n % 2 == 0)
// console.log(even)

let str = ['anil', 'suthar', 2, 3, true]
let check = str.filter((n) => typeof (n) == 'string')
console.log(check)


// reduce
let count = [1, 2, 3, 4, 5]

let total = count.reduce((acc, curr) => acc + curr, 0)

// console.log(total)

// map

// let v = [1, 2, 3, 4, 5]
// let t = v.map((value, index) => {
//     console.log(value + 1,index)
// })