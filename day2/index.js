#!/usr/bin/env node
const { readFile } = require('../util/helpers');

const println = (x) => { console.log(x); return x }
const testFile = "./day2/data_test.txt"
const realFile = "./day2/data_real.txt"

const add = (v1, v2) => {
    const result = []
    for (i = 0; i < v1.length; i++) result[i] = v1[i] + v2[i]
    return result
}

console.log(`day 2 - START`)

/**
    forward X increases the horizontal position by X units.
    down X increases the depth by X units.
    up X decreases the depth by X units.
 */
// [horizontal, vertical] == [x,y]

const convertToVector = (value) => {
    const [word, unitStr] = value.split(" ")
    const units = parseInt(unitStr)
    switch (word) {
        case "forward": return [units, 0]
        case "down": return [0, units]
        case "up": return [0, -units]
    }
}


const run = ({ file, startAt }) => readFile(file).split("\n")
    .map(convertToVector)
    .reduce(add, startAt)
    .reduce((a, b) => a * b)

console.log(`part 1 - test input result = ${run({ file: testFile, startAt: [0, 0] })}`)
console.log(`part 1 - real input result = ${run({ file: testFile, startAt: [0, 0] })}`)

/**
    down X increases your aim by X units.
    up X decreases your aim by X units.
    forward X does two things:
    It increases your horizontal position by X units.
    It increases your depth by your aim multiplied by X.
 */
// [horizontal, vertical, aim] == [x,y,z]
const convertToVector2 = (currentVector, value) => {
    const [word, unitStr] = value.split(" ")
    const units = parseInt(unitStr)
    const [_h, _v, aim] = currentVector
    switch (word) {
        case "down": return add(currentVector, [0, 0, units])
        case "up": return add(currentVector, [0, 0, -units])
        case "forward": return add(currentVector, [units, aim * units, 0])
    }
}

const run2 = ({ file, startAt }) => readFile(file).split("\n")
    .reduce(convertToVector2, startAt)
    .reduce((a, v) => { if (a.length < 2) a.push(v); return a }, [])
    .reduce((a, b) => a * b)

console.log(`part 2 - test input result = ${run2({ file: realFile, startAt: [0, 0, 0] })}`)
console.log(`part 2 - real input result = ${run2({ file: realFile, startAt: [0, 0, 0] })}`)

console.log(`day 2 - END`)