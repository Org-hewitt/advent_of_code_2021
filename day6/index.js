#!/usr/bin/env node
const { readFile } = require('../util/helpers');

const day = 6;
const test = `./day${day}/data_test.txt`
const real = `./day${day}/data_real.txt`

const toInt = x => parseInt(x)

const tick = (c, r) => {
    if (c === 0) return { daysLeft: r, newFish: true }
    return { daysLeft: --c }
}

const breed = ({ input, rNewFish, rOldFish }) => {
    const { n, f } = input.reduce(({ n, f }, currentFish) => {
        const { daysLeft, newFish } = tick(currentFish, rOldFish)
        f.push(daysLeft)
        return { n: newFish ? n + 1 : n, f }
    }, { n: 0, f: [] })

    for (let i = 0; i < n; i++) f.push(rNewFish)
    return f
}

const run = ({ file, days }) => {
    let fishies = readFile(file).split(",").map(toInt)
    for (let i = 0; i < days; i++) fishies = breed({ input: fishies, rNewFish: 8, rOldFish: 6 })
    return fishies.length
}

console.log(`START - day ${day}\n`)
console.log(`Pt1 : expect 26 from 18 days : actual = ${run({ file: test, days: 18 })}`)
console.log(`Pt1 : expect 5934 from 80 days : actual = ${run({ file: test, days: 80 })}\n`)
console.log(`Pt1 confirmed: 385391 : result = ${run({ file: real, days: 80 })}\n`)

// console.log(`Pt2 : expect xxx : actual = ${run({ file: test })}\n`)
// console.log(`Pt2 : actual = ${run({ file: real })}\n`)

console.log(`END   - day ${day}\n`)