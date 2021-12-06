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

const empty = () => [0, 0, 0, 0, 0, 0, 0, 0, 0]
const run = ({ file, days }) => {
    let fishies = readFile(file).split(",").map(toInt).reduce((acc, c) => {
        acc[c] = acc[c] + 1; return acc
    }, empty())
    for (let i = 0; i < days; i++) {
        fishies = fishies.reduce((acc, val, index, arr) => {
            if (index === 0) {
                acc[6] = val + (arr[7] || 0)
                acc[8] = val
            } else if (index === 7) { }
            else {
                acc[index - 1] = val
            }
            return acc
        }, empty())
        // console.log(`day ${i + 1} = ${JSON.stringify(fishies)}`)
    }
    return Object.values(fishies).reduce((a, b) => a + b)
}

console.log(`START - day ${day}\n`)
console.log(`Pt1 : expect 26 from 18 days : actual = ${run({ file: test, days: 18 })}`)
console.log(`Pt1 : expect 5934 from 80 days : actual = ${run({ file: test, days: 80 })}`)
console.log(`Pt1 confirmed: 385391 : result = ${run({ file: real, days: 80 })}\n`)

console.log(`Pt2 : expect 26984457539 : actual = ${run({ file: test, days: 256 })}`)
console.log(`Pt2 confirmed: 1728611055389 : result = ${run({ file: real, days: 256 })}\n`)

console.log(`END - day ${day}\n`)