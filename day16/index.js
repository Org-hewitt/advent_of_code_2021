#!/usr/bin/env node
const { readFile, getFileStrings } = require('../util/helpers');

const day = 16;
const { test, real } = getFileStrings(day)

const run = ({ file }) => {
    const lines = readFile(file).split("\n")

    console.log(lines)

    return "?"
}

console.log(`START - day ${day}\n`)
console.log(`PART - 1 : \n`)
console.log(`test data : expect     xxx : actual = ${run({ file: test })}`)
// console.log(`real data : confirmed: xxx : result = ${run({ file: real })}\n`)
// console.log(`PART - 2: \n`)
// console.log(`test data : expect     xxx : actual = ${run({ file: test })}`)
// console.log(`real data : confirmed: xxx : result = ${run({ file: real })}\n`)
console.log(`END - day ${day}\n`)