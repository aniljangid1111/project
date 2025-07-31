
// for (let i = 5; i > 0; i--) {
//     let line = ''
//     for (let j = 0; j < i; j++) {
//         line += '*'
//     }
//     console.log(line)
// }
let row = 5;
for (let i = 0; i <= row; i++) {
    let line = ' ';
    for (let j = 0; j <= row - i; j++) {
        line += ' ';
    }
    for (let k = 0; k <= (2 * i); k++) {
        line += ' * '
    }
    console.log(line)
}
for (let i = row - 1; i >= 0; i--) {
    let line = ' ';
    for (let j = 0; j <= row - i; j++) {
        line += ' ';
    }
    for (let k = 0; k <= (2 * i ); k++) {
        line += ' * '
    }
    console.log(line)
}
