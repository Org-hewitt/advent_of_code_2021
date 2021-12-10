#!/usr/bin/env node
const { readFile } = require('../util/helpers');

const day = 11;
const test = `./day${day}/data_test.txt`
const real = `./day${day}/data_real.txt`

const run = ({ file }) => {
    readFile(file)

    return ""
}

console.log(`START - day ${day}\n`)
console.log(`PART - 1 : \n`)
console.log(`test data : expect     xxx : actual = ${run({ file: test })}`)
// console.log(`real data : confirmed: xxx : result = ${run({ file: real })}\n`)
console.log(`PART - 2: \n`)
// console.log(`test data : expect     xxx : actual = ${run({ file: test })}`)
// console.log(`real data : confirmed: xxx : result = ${run({ file: real })}\n`)
console.log(`END - day ${day}\n`)