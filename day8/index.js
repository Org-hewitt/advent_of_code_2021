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

const decode = (mapping, aCodes) => {
    console.log(`got here`)
    console.log(mapping)
    console.log(`got here 2`)
    // console.log(aCodes)
    return aCodes.map(code => Object.entries(mapping).find(([_, aVal]) => {
        const result = arrayEquals(aVal, code)
        console.log(`   >> searching for ${code} within ${aVal} RESULT=${result}`)
        return result
    }).shift()).reduce((acc, v) => acc + v)
}

const run2 = ({ file, getMapping }) => readFile(file).split("\n")
    .map(line => {
        const [codes, values] = line.split(" | ")
        return toInt(decode(getMapping(codes), values.split(" ").map(x => x.split(""))))
    })


const setOf = (a1, a2) => {
    const result = new Set()
    for (let a of a1) result.add(a)
    for (let b of a2) result.add(b)
    return [...result]
}

const mappingLine1TestData = {
    "0": ["c", "a", "g", "e", "d", "b"],            // 6 length +4 == 7 length      set-6
    "1": ["a", "b"],                                // unique                       set-1 
    "2": ["a", "c", "d", "f", "g"],                 // 5 length +4 == 7 length      set-5
    "3": ["a", "b", "c", "d", "f"],                 // 5 length +1 == 5 length      set-5
    "4": ["a", "b", "e", "f"],                      // unique                       set-1 
    "5": ["b", "c", "d", "e", "f"],                 // 5 length +1 == 6 length      set-5
    "6": ["b", "c", "d", "e", "f", "g"],            // 6 length +1 == 7 length      set-6
    "7": ["a", "b", "d"],                           // unique                       set-1 
    "8": ["a", "b", "c", "d", "e", "f", "g"],       // unique                       set-1 
    "9": ["a", "b", "c", "d", "e", "f"]             // 6 length the other one       set-6
}

const getMapping = inputs => {
    const parts = inputs.split(" ").map(x => x.split(""))
    const results = {}

    results["1"] = parts.find(part => part.length === 2)
    results["7"] = parts.find(part => part.length === 3)
    results["4"] = parts.find(part => part.length === 4)
    results["8"] = parts.find(part => part.length === 7)

    const sixSizeSet = parts.filter(x => x.length === 6)
    results["0"] = sixSizeSet.find(part => setOf(part, results["7"]).length === 7)
    results["6"] = sixSizeSet.find(part => setOf(part, results["1"]).length === 7)
    results["9"] = sixSizeSet.find(part => !arrayEquals(results["0"], part) && !arrayEquals(results["6"], part))

    const fiveSizeSet = parts.filter(x => x.length === 5)
    results["2"] = fiveSizeSet.find(part => setOf(part, results["4"]).length === 7)
    results["3"] = fiveSizeSet.find(part => setOf(part, results["1"]).length === 5)
    results["5"] = fiveSizeSet.find(part => setOf(part, results["1"]).length === 6)

    return results
}

console.log(`START - day ${day}\n`)
console.log(`PART - 1 : \n`)
console.log(`test data : expect     2  : actual = ${run1({ file: test, lookFor: uniqueLenghts })}`)
console.log(`real data : confirmed: 303 : result = ${run1({ file: real, lookFor: uniqueLenghts })}\n`)
console.log(`PART - 2: \n`)
console.log(`test data : expect      61229 : actual = ${run2({ file: test, getMapping })}`)
// console.log(`real data : confirmed: xxx : result = ${run({ file: real })}\n`)
console.log(`END - day ${day}\n`)