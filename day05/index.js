#!/usr/bin/env node
const { readFile, getFileStrings } = require('../util/helpers');

const day = 5;
const { test, real } = getFileStrings(day)

const toInt = (x) => parseInt(x)
const ide = (v1, v2) => v1 === v2 ? 0 : v1 > v2 ? -1 : 1
const vectorFrom = ([x1, y1], [x2, y2]) => [ide(x1, x2), ide(y1, y2)]
const isEqual = ([x1, y1], [x2, y2]) => x1 === x2 && y1 === y2
const last = (arr) => arr.length > 0 ? arr.slice(-1).pop() : undefined
const add = ([x1, y1], [x2, y2]) => [x1 + x2, y1 + y2]
const allowVectorPt1 = ([x, y]) => !(x !== 0 && y !== 0)

const pointsBetweenCoords = (origin, end) => {
    const vector = vectorFrom(origin, end)
    const result = [origin]
    while (!isEqual(last(result), end)) result.push(add(last(result), vector))
    return { coords: result, vector }
}

const run = ({ file, allowVector }) => {
    const points = readFile(file).split("\n")
    const hits = {}
    for (s of points) {
        [pointA, pointB] = s.split(" -> ").map(v => v.split(',').map(toInt))
        const { coords, vector } = pointsBetweenCoords(pointA, pointB)
        if (allowVector(vector)) for ([x, y] of coords) hits[`${x},${y}`] = (hits[`${x},${y}`] || 0) + 1
    }

    return Object.entries(hits).filter(([_, val]) => val >= 2).length
}

console.log(`START - day ${day}\n`)
console.log(`Pt1 : expect 5 : actual = ${run({ file: test, allowVector: allowVectorPt1 })}\n`)
console.log(`Pt2 : expect 12 : actual = ${run({ file: test, allowVector: () => true })}\n`)

console.log(`Pt1 : answer = ${run({ file: real, allowVector: allowVectorPt1 })}\n`)
console.log(`Pt2 : actual = ${run({ file: real, allowVector: () => true })}\n`)
console.log(`END   - day ${day}\n`)