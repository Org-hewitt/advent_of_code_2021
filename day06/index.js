#!/usr/bin/env node
const { readFile, getFileStrings } = require('../util/helpers');

const day = 6;
const { test, real } = getFileStrings(day)

const toInt = x => parseInt(x)

const empty = () => [0, 0, 0, 0, 0, 0, 0, 0, 0]
const run = ({ file, days }) => {
    let fishies = readFile(file).split(",").map(toInt).reduce((acc, c) => {
        acc[c] = acc[c] + 1; return acc
    }, empty())
    for (let i = 0; i < days; i++) {
        const spawners = fishies.shift()
        fishies[6] = fishies[6] + spawners
        fishies.push(spawners)
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