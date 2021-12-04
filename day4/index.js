#!/usr/bin/env node
const { readFile } = require('../util/helpers');

const day = 4;
const test = `./day${day}/data_test.txt`
const real = `./day${day}/data_real.txt`

const run = ({ file }) => {
    return ""
}

const run2 = ({ file }) => {
    return ""
}

console.log(`START - day ${day}\n`)
console.log(`Pt1 : expect xxx : actual = ${run({ file: test })}`)
// console.log(`Pt2 : expect xxx : actual = ${run2({ file: test })}\n`)

// console.log(`Pt1 : answer = ${run({ file: real })}`)
// console.log(`Pt2 : answer = ${run2({ file: real })}\n`)
console.log(`END   - day ${day}\n`)