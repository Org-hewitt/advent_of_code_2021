#!/usr/bin/env node
const { readFile } = require('../util/helpers');

const day = 9;
const test = `./day${day}/data_test.txt`
const real = `./day${day}/data_real.txt`

const toInt = x => parseInt(x)
const toConsole = (x) => { console.log(x); return x }

const getAdjacents = (x, y, rows) =>
    [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]]
        .filter(([x1, y1]) => x1 >= 0)
        .filter(([x1, y1]) => y1 >= 0)
        .filter(([x1, y1]) => x1 <= rows[0].length - 1)
        .filter(([x1, y1]) => y1 <= rows.length - 1)

const isMinimum = (x, y, rows) => getAdjacents(x, y, rows).every(([x2, y2]) => rows[y2][x2] > rows[y][x])

const getBasinFor = ([x, y], rows, inBasin) =>
    getAdjacents(x, y, rows)
        .filter(([x1, y1]) => rows[y1][x1] !== 9)                                   // get rid of 9s
        .filter(([x1, y1]) => !inBasin.some(([x2, y2]) => x1 === x2 && y1 === y2))  // get rid of already processed points
        .filter(([x1, y1]) => rows[y][x] < rows[y1][x1])                            // we're still a valid basin point
        .map(point => { inBasin.push([point[0], point[1]]); return point; })
        .map(point => getBasinFor(point, rows, inBasin))

const calcScorePt1 = (mins, rows) => mins.map(([x, y]) => rows[y][x]).reduce((a, b) => a + b + 1, 0)
const calcScorePt2 = (mins, rows) => {
    console.log(`ok, we have ${mins.length} local minimums`)
    return mins.map(min => {
        const basin = [min]
        getBasinFor(min, rows, basin)
        return { point: min, basin }
    })
        .sort((a, b) => a.basin.length - b.basin.length)
        .reduce((acc, { basin, point }) => {
            // console.log(`point: (${point[0]},${point[1]}) -> ${basin.length}`)
            const v = basin.length
            if (acc.length == 3) {
                acc = acc.filter(max => max >= v)
                if (acc.length !== 3) acc.push(v)
            } else {
                acc.push(v)
            }
            return acc
        }, []).map(toConsole).reduce((a, b) => a * b, 1)
}

const run = ({ file, calcScore }) => {
    const rows = readFile(file).split("\n").map(x => x.trim().split("").map(toInt))
    const localMins = []
    rows.forEach((row, y) => {
        row.forEach((_, x) => {
            if (isMinimum(x, y, rows)) localMins.push([x, y])
        })
    })

    return calcScore(localMins, rows)
}

console.log(`START - day ${day}\n`)
console.log(`PART - 1 : \n`)
console.log(`test data : expect      15 : actual = ${run({ file: test, calcScore: calcScorePt1 })}`)
console.log(`real data : confirmed: 570 : result = ${run({ file: real, calcScore: calcScorePt1 })} \n`)
console.log(`PART - 2: \n`)
console.log(`real data : confirmed: 899392 : result = ${run({ file: real, calcScore: calcScorePt2 })}\n`)
console.log(`test data : expect    1134 : actual = ${run({ file: test, calcScore: calcScorePt2 })}`)
console.log(`END - day ${day}\n`)