#!/usr/bin/env node
const { readFile } = require('../util/helpers');

const test = "./day3/data_test.txt"
const real = "./day3/data_real.txt"

const countOnes = (acc, val) => {
    const length = val.length
    if (acc.length != length) {
        acc.length = length
        for (x = 0; x < length; x++) acc[x] = 0
    }
    return acc.map((v, i) => v + parseInt(val[i]))
}

const toGama = (counts, total) => counts.map(ones => ones > total - ones ? "1" : "0").join("")
const toEpsilon = (counts, total) => counts.map(ones => ones > total - ones ? "0" : "1").join("")
const toDecimal = (sBinary) => parseInt(sBinary, 2)

const run = ({ file }) => {
    const dataItems = readFile(file).split("\n")
    const ones = dataItems.reduce(countOnes, [])
    const gama = toDecimal(toGama(ones, dataItems.length))
    const epsilon = toDecimal(toEpsilon(ones, dataItems.length))
    return gama * epsilon
}

const findMatch = (items, valFn) => {
    let tmp = [...items]
    for (i = 0; i < items[0].length; i++) {
        if (tmp.length === 1) break;
        const ones = tmp.reduce(countOnes, [])[i]
        const zeros = tmp.length - ones
        tmp = tmp.filter(val => val[i] === valFn({ ones, zeros }))
    }
    return tmp[0]
}

const run2 = ({ file }) => {
    const dataItems = readFile(file).split("\n")
    const o2 = findMatch(dataItems, ({ ones, zeros }) => (ones >= zeros) ? "1" : "0")
    const co2 = findMatch(dataItems, ({ ones, zeros }) => (ones < zeros) ? "1" : "0")
    return toDecimal(o2) * toDecimal(co2)
}

console.log(`START - day 3\n`)
console.log(`Pt1 : expect 198 : actual = ${run({ file: test })}`)
console.log(`Pt2 : expect 230 : actual = ${run2({ file: test })}\n`)

console.log(`Pt1 : answer = ${run({ file: real })}`)
console.log(`Pt2 : answer = ${run2({ file: real })}\n`)
console.log(`END   - day 3\n`)