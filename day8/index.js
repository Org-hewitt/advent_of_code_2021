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

const arrayEquals = (a, b) => {
    const foo = a.length === b.length && a.every(v => b.includes(v))
    console.log(` >> arrayEquals : ${a} in ${b} RESULT=${foo}`)
    return foo
}
const decode = (mapping, aCodes) => {
    console.log(`DECODE -> \n`, mapping, "\n")
    return aCodes.map(code => Object.entries(mapping).find(([_, aVal]) => arrayEquals(code, aVal)).shift()).reduce((acc, v) => acc + v)
}

const run2 = ({ file, getMapping }) => readFile(file).split("\n")
    .map(line => {
        const [codes, values] = line.split(" | ")
        return toInt(decode(getMapping(codes), values.split(" ").map(x => x.split("").sort())))
    }).reduce((a, b) => a + b)


const setOf = (a1, a2) => {
    const result = new Set()
    for (let a of a1) result.add(a)
    for (let b of a2) result.add(b)
    return [...result]
}

const getMapping = inputs => {
    const uParts = inputs.split(" ").map(x => x.split(""))
    console.log(uParts)
    const parts = uParts.sort()
    const results = {}

    results["1"] = parts.find(part => part.length === 2)
    results["7"] = parts.find(part => part.length === 3)
    results["4"] = parts.find(part => part.length === 4)
    results["8"] = parts.find(part => part.length === 7)

    const fiveSizeSet = parts.filter(x => x.length === 5)
    results["2"] = fiveSizeSet.find(part => setOf(part, results["4"]).length === 7)
    results["3"] = fiveSizeSet.find(part => setOf(part, results["1"]).length === 5)
    results["5"] = fiveSizeSet.find(part => setOf(part, results["1"]).length === 6)

    const sixSizeSet = parts.filter(x => x.length === 6)
    results["6"] = sixSizeSet.find(part => setOf(part, results["1"]).length === 7)
    results["0"] = sixSizeSet.find(part => setOf(part, results["5"]).length === 7)
    results["9"] = sixSizeSet.find(part => !arrayEquals(results["0"], part) && !arrayEquals(results["6"], part))

    return results
}

console.log(`START - day ${day}\n`)
console.log(`PART - 1 : \n`)
console.log(`test data : expect     2  : actual = ${run1({ file: test, lookFor: uniqueLenghts })}`)
console.log(`real data : confirmed: 303 : result = ${run1({ file: real, lookFor: uniqueLenghts })}\n`)
console.log(`PART - 2: \n`)
console.log(`here1`)
// console.log(`test data : expect      61229 : actual = ${run2({ file: test, getMapping })}`)
console.log(`real data : confirmed: xxx : result = ${run2({ file: real, getMapping })}\n`)
console.log(`END - day ${day}\n`)