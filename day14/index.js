#!/usr/bin/env node
const { readFile, getFileStrings } = require('../util/helpers');

const day = 14;
const { test, real } = getFileStrings(day)

const run = ({ loop, file }) => {
    const [polymer, _, ...expansions] = readFile(file).split("\n")
    const mappings = expansions.reduce((acc, v) => {
        const [[a, b], e] = v.split(" -> ")
        acc[a + b] = [[a + e], [e + b]]
        return acc
    }, {})

    let counts = {}
    for (let i = 0; i < polymer.length - 1; i++) {
        const key = `${polymer.charAt(i)}${polymer.charAt(i + 1)}`
        counts[key] = (counts[key] || 0) + 1
    }

    for (let i = 0; i < loop; i++) {
        counts = Object.entries(counts).reduce((acc, [k, v]) => {
            (mappings[k] || [k]).forEach(val => acc[val] = (acc[val] || 0) + v)
            return acc
        }, {})
    }
    const totals = Object.entries(counts).reduce((acc, [key, count]) => {
        for (let x of key) acc[x] = (acc[x] || 0) + count
        return acc
    }, {})

    const actuals = Object.entries(totals).reduce((acc, [k, v]) => {
        acc[k] = Math.ceil(v / 2)
        return acc
    }, {})

    const e = Object.entries(actuals).sort(([, v1], [, v2]) => v1 - v2)
    const least = [...e].shift()
    const most = [...e].pop()

    console.log(most, least)

    return most[1] - least[1]
}

console.log(`START - day ${day}\n`)
console.log(`PART - 1 : \n`)
console.log(`test data : expect      1588 : actual = ${run({ loop: 10, file: test })}`)
console.log(`real data : confirmed:  2194 : result = ${run({ loop: 10, file: real }) - 1}\n`)
// console.log(`PART - 2: \n`)
console.log(`test data : expect     2188189693529 : actual = ${run({ loop: 40, file: test })}`)
console.log(`real data : confirmed  2360298895777 : result = ${run({ loop: 40, file: real }) - 1}\n`)
console.log(`END - day ${day}\n`)