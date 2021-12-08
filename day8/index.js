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

const arrayEquals = (a, b) => a.length === b.length && a.every(v => b.includes(v))

const decode = (mapping, aCodes) => aCodes.map(code => Object.entries(mapping).find(([_, aVal]) => arrayEquals(aVal, code)).shift()).reduce((acc, v) => acc + v)

const run2 = ({ file, getMapping }) => readFile(file).split("\n")
    .map(line => {
        const [codes, values] = line.split(" | ")
        return toInt(decode(getMapping(codes), values.split(" ").map(x => x.split(""))))
    })

const mappingLine1TestData = {
    "0": ["c", "a", "g", "e", "d", "b"],
    "1": ["a", "b"],
    "2": ["a", "c", "d", "f", "g"],
    "3": ["a", "b", "c", "d", "f"],
    "4": ["a", "b", "e", "f"],
    "5": ["b", "c", "d", "e", "f"],
    "6": ["b", "c", "d", "e", "f", "g"],
    "7": ["a", "b", "d"],
    "8": ["a", "b", "c", "d", "e", "f", "g"],
    "9": ["a", "b", "c", "d", "e", "f"]
}



console.log(`START - day ${day}\n`)
console.log(`PART - 1 : \n`)
// console.log(`test data : expect     2  : actual = ${run1({ file: test, lookFor: uniqueLenghts })}`)
console.log(`real data : confirmed: 303 : result = ${run1({ file: real, lookFor: uniqueLenghts })}\n`)
console.log(`PART - 2: \n`)
console.log(`test data : expect      61229 : actual = ${run2({ file: test, getMapping })}`)
// console.log(`real data : confirmed: xxx : result = ${run({ file: real })}\n`)
console.log(`END - day ${day}\n`)