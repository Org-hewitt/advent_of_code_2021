#!/usr/bin/env node
const { readFile, getFileStrings } = require('../util/helpers');

const day = 16;
const { test, real } = getFileStrings(day)

const run = ({ file }) => {
    const lines = readFile(file).split("\n")

    console.log(lines)

    return "?"
}

const mapping = {
    "0": "0000",
    "1": "0001",
    "2": "0010",
    "3": "0011",
    "4": "0100",
    "5": "0101",
    "6": "0110",
    "7": "0111",
    "8": "1000",
    "9": "1001",
    "A": "1010",
    "B": "1011",
    "C": "1100",
    "D": "1101",
    "E": "1110",
    "F": "1111"
}

const convert = line => {

}


console.log(convert("D2FE28"))


console.log(`START - day ${day}\n`)
console.log(`PART - 1 : \n`)
// console.log(`test data : expect     xxx : actual = ${run({ file: test })}`)
// console.log(`real data : confirmed: xxx : result = ${run({ file: real })}\n`)
// console.log(`PART - 2: \n`)
// console.log(`test data : expect     xxx : actual = ${run({ file: test })}`)
// console.log(`real data : confirmed: xxx : result = ${run({ file: real })}\n`)
console.log(`END - day ${day}\n`)