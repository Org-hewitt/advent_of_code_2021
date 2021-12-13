#!/usr/bin/env node
const { readFile, getFileStrings } = require('../util/helpers');

const day = 8;
const { test, real } = getFileStrings(day)

const toInt = x => parseInt(x)

const uniqueLenghts = [2, 3, 4, 7]
const run1 = ({ file, lookFor }) => readFile(file).split("\n")
    .map(line => line.split(" | ")[1].split(" "))
    .reduce((acc, val) => acc.concat(val), [])
    .filter(s => lookFor.includes(s.length))
    .length

const arrayEquals = (a, b) => a.length === b.length && a.every(y => b.includes(y))

const decode = (mapping, aCodes) =>
    aCodes.map(code => Object.entries(mapping)
        .find(([_, aVal]) => arrayEquals(code, aVal)).shift())
        .reduce((acc, v) => acc + v)

const run2 = ({ file, getMapping }) => readFile(file).split("\n")
    .map(line => {
        const [codes, values] = line.split(" | ")
        return toInt(decode(getMapping(codes), values.split(" ").map(x => x.split("").sort())))
    }).reduce((a, b) => a + b)

const setOf = (a1, a2) => [...new Set([...a1, ...a2])]
const getMapping = inputs => {
    const parts = inputs.split(" ").map(x => x.split("").sort())
    const results = {}

    results["1"] = parts.find(part => part.length === 2)
    results["7"] = parts.find(part => part.length === 3)
    results["4"] = parts.find(part => part.length === 4)
    results["8"] = parts.find(part => part.length === 7)

    let fiveSizeSet = parts.filter(x => x.length === 5)
    results["2"] = fiveSizeSet.find(part => setOf(part, results["4"]).length === 7)
    fiveSizeSet = fiveSizeSet.filter(x => !arrayEquals(x, results["2"]))
    results["3"] = fiveSizeSet.find(part => setOf(part, results["1"]).length === 5)
    results["5"] = fiveSizeSet.find(part => setOf(part, results["1"]).length === 6)

    let sixSizeSet = parts.filter(x => x.length === 6)
    results["6"] = sixSizeSet.find(part => setOf(part, results["1"]).length === 7)
    sixSizeSet = sixSizeSet.filter(a => !arrayEquals(a, results["6"]))
    results["0"] = sixSizeSet.find(part => setOf(part, results["5"]).length === 7)
    results["9"] = sixSizeSet.filter(a => !arrayEquals(results["0"], a)).pop()

    return results
}

console.log(`START - day ${day}\n`)
console.log(`PART - 1 : \n`)
console.log(`test data : expect         26 : actual = ${run1({ file: test, lookFor: uniqueLenghts })}`)
console.log(`real data : confirmed:    303 : result = ${run1({ file: real, lookFor: uniqueLenghts })}\n`)
console.log(`PART - 2: \n`)
console.log(`test data : expect      61229 : actual = ${run2({ file: test, getMapping })}`)
console.log(`real data : confirmed: 961734 : result = ${run2({ file: real, getMapping })}\n`)
console.log(`END - day ${day}\n`)