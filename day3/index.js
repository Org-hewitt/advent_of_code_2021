#!/usr/bin/env node
const { readFile } = require('../util/helpers');

const test = "./day3/data_test.txt"
const real = "./day3/data_real.txt"

const run = () => {
    return ""
}

console.log(`day 3 - START`)

console.log(`part 1 - T = ${run({ file: test })}`)
console.log(`part 1 - R = ${run({ file: real })}`)
console.log(`part 2 - T = ${run({ file: test })}`)
console.log(`part 2 - R = ${run({ file: real })}`)

console.log(`day 3 - END`)