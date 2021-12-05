#!/usr/bin/env node
const { readFile } = require('../util/helpers');

const day = 5;
const test = `./day${day}/data_test.txt`
const real = `./day${day}/data_real.txt`

// increase / decrease / equal
const ide = (a, b) => {
    if (a === b) return 0
    else if (a > b) return -1
    return 1
}

const ToInt = (x) => parseInt(x)

const pointsBetweenCoords = (origin, end) => {
    const [x1, y1] = origin
    const [x2, y2] = end
    const vector = [ide(x1, x2), ide(y1, y2)]
    const result = [origin]
    let lastCoord = origin

    while (!(lastCoord[0] == end[0] && lastCoord[1] == end[1])) {
        const nextCoord = [lastCoord[0] + vector[0], lastCoord[1] + vector[1]]
        result.push(nextCoord)
        lastCoord = nextCoord
    }
    return { coords: result, vector }
}

const allowVectorPt1 = ([x, y]) => !(x !== 0 && y !== 0)
const allowVectorPt2 = ([x, y]) => true

const run = ({ file, allowVector }) => {
    const points = readFile(file).split("\n")
    const hits = {}
    for (s of points) {
        [a, b] = s.split(" -> ")
        const { coords, vector } = pointsBetweenCoords(a.split(",").map(ToInt), b.split(",").map(ToInt))
        if (allowVector(vector)) for ([x, y] of coords) hits[`${x},${y}`] = (hits[`${x},${y}`] || 0) + 1
    }

    return Object.entries(hits).filter(([_, val]) => val >= 2).length
}

console.log(`START - day ${day}\n`)
console.log(`Pt1 : expect 5 : actual = ${run({ file: test, allowVector: allowVectorPt1 })}\n`)
console.log(`Pt2 : expect 12 : actual = ${run({ file: test, allowVector: allowVectorPt2 })}\n`)

console.log(`Pt1 : answer = ${run({ file: real, allowVector: allowVectorPt1 })}\n`)
console.log(`Pt2 : actual = ${run({ file: real, allowVector: allowVectorPt2 })}\n`)
console.log(`END   - day ${day}\n`)