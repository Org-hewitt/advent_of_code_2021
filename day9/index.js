#!/usr/bin/env node
const { readFile } = require('../util/helpers');

const day = 9;
const test = `./day${day}/data_test.txt`
const real = `./day${day}/data_real.txt`

const toInt = x => parseInt(x)

const getAdjacents = (x, y, rows) =>
    [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]]
        .filter(([x1, y1]) => x1 >= 0)
        .filter(([x1, y1]) => x1 <= rows[0].length - 1)
        .filter(([x1, y1]) => y1 >= 0)
        .filter(([x1, y1]) => y1 <= rows.length - 1)

const isMinimum = (x, y, rows) => getAdjacents(x, y, rows).every(([x2, y2]) => rows[y2][x2] > rows[y][x])

const riskLevelPt1 = () => 1

const run = ({ file, riskLevel }) => {
    const rows = readFile(file).split("\n").map(x => x.split("").map(toInt))
    const localMins = []
    rows.forEach((row, y) => {
        row.forEach((val, x) => {
            if (isMinimum(x, y, rows)) localMins.push(val)
        })
    })

    return localMins.reduce((a, b) => a + b + riskLevel(b), 0)
}

console.log(`START - day ${day}\n`)
console.log(`PART - 1 : \n`)
console.log(`test data : expect      15 : actual = ${run({ file: test, riskLevel: riskLevelPt1 })}`)
console.log(`real data : confirmed: 570 : result = ${run({ file: real, riskLevel: riskLevelPt1 })} \n`)
console.log(`PART - 2: \n`)
// console.log(`test data : expect     xxx : actual = ${run({ file: test })}`)
// console.log(`real data : confirmed: xxx : result = ${run({ file: real })}\n`)
console.log(`END - day ${day}\n`)