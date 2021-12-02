#!/usr/bin/env node
const { readFile } = require('../util/helpers');

const test = "./day2/data_test.txt"
const real = "./day2/data_real.txt"

const vectorReducer = (vectorFactory) => (vOld, sOrder) => {
    const [move, sUnit] = sOrder.split(" ")
    const vMove = vectorFactory[move](vOld, parseInt(sUnit))
    const vResult = vOld.map((v, i) => v + vMove[i])
    // console.log(vOld, "+", vMove, "=", vResult)
    return vResult
}

const run = ({ file, origin, r }) => readFile(file).split("\n").reduce(r, origin).slice(0, 2).reduce((a, b) => a * b)

console.log(`day 2 - START`)

const vectorFactoryXY = {
    up: (_, unit) => [0, -unit],
    down: (_, unit) => [0, unit],
    forward: (_, unit) => [unit, 0]
}

console.log(`part 1 - T = ${run({ file: test, origin: [0, 0], r: vectorReducer(vectorFactoryXY) })}`)
console.log(`part 1 - R = ${run({ file: real, origin: [0, 0], r: vectorReducer(vectorFactoryXY) })}`)

const vectorFactoryXYZ = {
    up: (_, unit) => [0, 0, -unit],
    down: (_, unit) => [0, 0, unit],
    forward: ([_x, _y, aim], unit) => [unit, aim * unit, 0]
}

console.log(`part 2 - T = ${run({ file: test, origin: [0, 0, 0], r: vectorReducer(vectorFactoryXYZ) })}`)
console.log(`part 2 - R = ${run({ file: real, origin: [0, 0, 0], r: vectorReducer(vectorFactoryXYZ) })}`)

console.log(`day 2 - END`)