#!/usr/bin/env node
const { readFile } = require('../util/helpers');

const day = 11;
const test = `./day${day}/data_test.txt`
const real = `./day${day}/data_real.txt`

const toInt = x => parseInt(x)

const run = ({ file }) => {
    const input = readFile(file).split('\n').map(s => s.split("").map(toInt))
    console.log(input)

    return ""
}

console.log(`START - day ${day}\n`)
console.log(`PART - 1 : \n`)
console.log(`test data : expect    1656 : actual = ${run({ file: test })}`)
// console.log(`real data : confirmed: xxx : result = ${run({ file: real })}\n`)
// console.log(`PART - 2: \n`)
// console.log(`test data : expect     xxx : actual = ${run({ file: test })}`)
// console.log(`real data : confirmed: xxx : result = ${run({ file: real })}\n`)
console.log(`END - day ${day}\n`)