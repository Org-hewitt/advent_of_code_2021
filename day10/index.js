#!/usr/bin/env node
const { readFile } = require('../util/helpers');

const day = 10;
const test = `./day${day}/data_test.txt`
const real = `./day${day}/data_real.txt`

const values = { ")": 3, "]": 57, "}": 1197, ">": 25137 }
const closingBrackets = { "[": "]", "{": "}", "(": ")", "<": ">", }
const isClosingBracket = ["]", "}", ")", ">"]

const convertToValue = (bracket) => values[bracket]

const convert = (line, includeIncomplete) => {
    const input = line.split("")
    const expectedCloses = []

    for (let x of input) {
        if (isClosingBracket.includes(x)) {
            if (expectedCloses.length === 0) return { corrupt: true, brokenBracket: x }
            if (expectedCloses.pop() !== x) return { corrupt: true, brokenBracket: x }
        } else {
            expectedCloses.push(closingBrackets[x])
        }
    }
    if (includeIncomplete && expectedCloses.length > 0) return { incomplete: true, expectedCloses }

    return { corrupt: false }
}

const run = ({ file }) => {
    const lines = readFile(file).split("\n")

    return lines
        .map(x => convert(x))
        .filter(({ corrupt }) => corrupt)
        .map(({ brokenBracket }) => brokenBracket)
        .map(convertToValue)
        .reduce((a, b) => a + b, 0)
}

const values2 = { "]": 2, ")": 1, "}": 3, ">": 4, }
const convertToValue2 = (arr) => arr.reverse().reduce((acc, v) => acc * 5 + (values2[v]), 0)

const run2 = ({ file }) => {
    const lines = readFile(file).split("\n")
    const x = lines
        .map(x => convert(x, true))
        .filter(({ incomplete }) => incomplete)
        .map(({ expectedCloses }) => expectedCloses)
        .map(convertToValue2)
        .sort((a, b) => a - b)

    return x[(x.length - 1) / 2]
}

console.log(`START - day ${day}\n`)
console.log(`PART - 1 : \n`)
console.log(`test data : expect      26397 : actual = ${run({ file: test })}`)
console.log(`real data : confirmed: 367059 : result = ${run({ file: real })}\n`)
console.log(`PART - 2: \n`)
console.log(`test data : expect     288957 : actual = ${run2({ file: test })}`)
console.log(`real data : confirmed: xxx : result = ${run2({ file: real })}\n`)
console.log(`END - day ${day}\n`)