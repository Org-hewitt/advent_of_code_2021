#!/usr/bin/env node
const { readFile, toInt, getAdjacentPoints } = require('../util/helpers');

const day = 11;
const test = `./day${day}/data_test.txt`
const real = `./day${day}/data_real.txt`

const getFlashes = (arr, oldFlashes) => {
    const points = {}
    for (let y = 0; y < arr.length; y++)
        for (let x = 0; x < arr[y].length; x++)
            if (arr[y][x] >= 10 && !oldFlashes.has(`(${x},${y})`))
                points[`(${x},${y})`] = getAdjacentPoints({ point: [x, y], maxX: arr[0].length - 1, maxY: arr.length - 1, includeDiagonal: true })
    return points
}

const tick = (input) => {
    for (let y = 0; y < input.length; y++) for (let x = 0; x < input[y].length; x++) input[y][x] += 1
    let newFlashes = {}
    const flashPoints = new Set()
    do {
        newFlashes = getFlashes(input, flashPoints)
        Object.entries(newFlashes).forEach(([key, points]) => {
            flashPoints.add(key)
            points.forEach(([x, y]) => input[y][x] += 1)
        });
    } while (Object.keys(newFlashes).length !== 0)

    let flashCount = 0
    for (let y = 0; y < input.length; y++)
        for (let x = 0; x < input[y].length; x++)
            if (input[y][x] >= 10) {
                flashCount++
                input[y][x] = 0
            }

    return flashCount
}

const run = ({ file }) => {
    const input = readFile(file).split('\n').map(s => s.split("").map(toInt))
    let flashes = 0
    for (let i = 0; i < 100; i++) flashes += tick(input)
    return flashes
}

const run2 = ({ file }) => {
    const input = readFile(file).split('\n').map(s => s.split("").map(toInt))
    let flashes, tickCount = 0
    do { flashes = tick(input); tickCount++ }
    while (flashes !== 100)
    return tickCount
}

console.log(`START - day ${day}\n`)
console.log(`PART - 1 : \n`)
console.log(`test data : expect     1656 : actual = ${run({ file: test })}`)
console.log(`real data : confirmed: 1743 : result = ${run({ file: real })}\n`)
console.log(`PART - 2: \n`)
console.log(`test data : expect      195 : actual = ${run2({ file: test })}`)
console.log(`real data : confirmed:  364 : result = ${run2({ file: real })}\n`)
console.log(`END - day ${day}\n`)
