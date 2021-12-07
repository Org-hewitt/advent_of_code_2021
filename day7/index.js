#!/usr/bin/env node
const { readFile } = require('../util/helpers');

const day = 7;
const test = `./day${day}/data_test.txt`
const real = `./day${day}/data_real.txt`

const toInt = x => parseInt(x)

const run = ({ file, fuelCost }) => {
    const input = readFile(file).split(",").map(toInt)
    const max = input.reduce((acc, v) => v < acc ? acc : v, 0)
    const min = input.reduce((acc, v) => v > acc ? acc : v, 0)
    let lastFuelCost = 999999999999999999999;
    for (let x = min; x <= max; x++) {
        const cost = input.reduce((acc, v) => acc + fuelCost(x, v), 0)
        if (cost > lastFuelCost) break
        lastFuelCost = cost
    }

    return lastFuelCost
}

const fuelCostPt1 = (a, b) => Math.abs(a - b)
const fuelCostPt2 = (a, b) => {
    let distance = fuelCostPt1(a, b)
    let result = 0
    do { result += distance-- } while (distance > 0)
    return result
}

console.log(`START - day ${day}\n`)
console.log(`Pt1 : expect 37 : actual = ${run({ file: test, fuelCost: fuelCostPt1 })}`)
console.log(`Pt1 confirmed: 344535 : result = ${run({ file: real, fuelCost: fuelCostPt1 })}\n`)

console.log(`Pt2 : expect 168 : actual = ${run({ file: test, fuelCost: fuelCostPt2 })}`)
console.log(`Pt2 confirmed: xxx : result = ${run({ file: real, fuelCost: fuelCostPt2 })}\n`)

console.log(`END - day ${day}\n`)