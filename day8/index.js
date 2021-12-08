#!/usr/bin/env node
const { readFile } = require('../util/helpers');

const day = 8;
const test = `./day${day}/data_test.txt`
const real = `./day${day}/data_real.txt`

const toInt = x => parseInt(x)

const run1 = ({ file, lookFor }) => readFile(file).split("\n")
    .map(line => line.split(" | ")[1].split(" "))
    .reduce((acc, val) => acc.concat(val), [])
    .filter(s => lookFor.includes(s.length))
    .length

const uniqueLenghts = [2, 3, 4, 7] // 1, 7, 4, 8

const decode = (mapping, aCodes) => {
    console.log(`here`, mapping, aCodes)
    return aCodes.map(code => {
        console.log(`searching for ${code} -> ${mapping[code]}`)
        return mapping[code]
    }).reduce((acc, v) => acc + v)
}

const run2 = ({ file, getMapping }) => readFile(file).split("\n")
    .map(line => {
        const [codes, values] = line.split(" | ")
        const mapping = getMapping(codes)
        return toInt(decode(mapping, values.split(" ")))
    })

const mappingLine1TestData = { "acedgfb": "8", "cdfbe": "5", "gcdfa": "2", "fbcad": "3", "dab": "7", "cefabd": "9", "cdfgeb": "6", "eafb": "4", "cagedb": "0", "ab": "1" }

console.log(`START - day ${day}\n`)
console.log(`PART - 1 : \n`)
// console.log(`test data : expect     2  : actual = ${run1({ file: test, lookFor: uniqueLenghts })}`)
console.log(`real data : confirmed: 303 : result = ${run1({ file: real, lookFor: uniqueLenghts })}\n`)
console.log(`PART - 2: \n`)
console.log(`test data : expect    5353 : actual = ${run2({ file: test, getMapping: () => mappingLine1TestData })}`)
// console.log(`real data : confirmed: xxx : result = ${run({ file: real })}\n`)
console.log(`END - day ${day}\n`)