#!/usr/bin/env node
const { readFile, getFileStrings } = require('../util/helpers');

const day = 2;
const { test, real } = getFileStrings(day)

const vectorReducer = (vectorFactory) => (vOld, sOrder) => {
    const [move, sUnit] = sOrder.split(" ")
    const vMove = vectorFactory[move](vOld, parseInt(sUnit))
    const vResult = vOld.map((v, i) => v + vMove[i])
    // console.log(vOld, "+", vMove, "=", vResult)
    return vResult
}

const run = ({ file, origin, r }) => readFile(file).split("\n").reduce(r, origin).slice(0, 2).reduce((a, b) => a * b)

const vectorFactoryXY = {
    up: (_, unit) => [0, -unit],
    down: (_, unit) => [0, unit],
    forward: (_, unit) => [unit, 0]
}

const vectorFactoryXYZ = {
    up: (_, unit) => [0, 0, -unit],
    down: (_, unit) => [0, 0, unit],
    forward: ([_x, _y, aim], unit) => [unit, aim * unit, 0]
}

console.log(`START - day 2`)
console.log(`Pt1 : expect 150 : actual = ${run({ file: test, origin: [0, 0], r: vectorReducer(vectorFactoryXY) })}`)
console.log(`Pt1 : answer = ${run({ file: real, origin: [0, 0], r: vectorReducer(vectorFactoryXY) })}`)
console.log(`Pt2 : expect 900 : actual = ${run({ file: test, origin: [0, 0, 0], r: vectorReducer(vectorFactoryXYZ) })}`)
console.log(`Pt2 : answer = ${run({ file: real, origin: [0, 0, 0], r: vectorReducer(vectorFactoryXYZ) })}`)
console.log(`END   - day 2`)