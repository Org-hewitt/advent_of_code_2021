#!/usr/bin/env node
const { readFile, getFileStrings } = require('../util/helpers');

const day = 14;
const { test, real } = getFileStrings(day)

const run = ({ file, start, loop }) => {
    // [ "ab", "c"] ]
    const inserts = readFile(file)
        .split("\n")
        .map(l => l.split(" -> "))
        .reduce((acc, [left, right]) => ({ ...acc, [left]: [[left[0] + right], [right + left[1]]] }), {})

    let last = {}
    for (let i = 0; i < start.length - 1; i++) {
        let key = start.substring(i, i + 2)
        last[key] = (last[key] || 0) + 1
    }

    console.log(last)

    for (let i = 0; i < loop; i++) {
        last = Object.entries(last).reduce((acc, [k, v]) => {
            (inserts[k] || [k]).forEach(pair => {
                acc[pair] = (last[pair] || 0) + v
            })
            return acc
        }, {})
    }

    console.log(last)

    const counts = Object.entries(last).reduce((acc, [k, v]) => ({
        ...acc,
        [k.charAt(0)]: (acc[k.charAt(0)] || 0) + v,
        [k.charAt(1)]: (acc[k.charAt(1)] || 0) + v
    }), {})

    const e = Object.entries(counts).sort(([, v1], [, v2]) => v1 - v2)
    const most = [...e].pop()
    const least = [...e].shift()

    console.log(e, most, least)

    return Math.ceil(most[1] / 2) - Math.ceil(least[1] / 2)
}

console.log(`START - day ${day}\n`)
console.log(`PART - 1 : \n`)
// console.log(`test data : expect      1588 : actual = ${run({ loop: 10, start: "NNCB", file: test })}\n`)
console.log(`real data : confirmed:  2194 : result = ${run({ loop: 10, start: "OOBFPNOPBHKCCVHOBCSO", file: real })}\n`)
// console.log(`PART - 2: \n`)
// console.log(`test data : ?WROGN     2188189693529 : actual = ${run({ loop: 20, start: "NNCB", file: test })}`)
// console.log(`real data : !!WRONG!!:  2194         : result = ${run({ loop: 40, start: "OOBFPNOPBHKCCVHOBCSO", file: real })}\n`)
// console.log(`real data : confirmed: xxx : result = ${run({ file: real })}\n`)
console.log(`END - day ${day}\n`)