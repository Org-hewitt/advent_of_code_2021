#!/usr/bin/env node
const { readFile } = require('../util/helpers');

const hasGroupWithSize = (size) => (_val, index, array) => index + size <= array.length
const getGroupWithSize = (size, array) => (_val, index) => array.slice(index, index + size)
const sumGroup = (vals) => vals.reduce((a, b) => a + b);

const runWith = ({ size, file }) => {
    const allDepths = readFile(file).split("\n").map(s => parseInt(s));
    return allDepths
        .filter(hasGroupWithSize(size))
        .map(getGroupWithSize(size, allDepths))
        .map(sumGroup)
        .filter((val, i, arr) => i !== 0 && val > arr[i - 1])
        .length
}

console.log(`START - day 1`)
console.log(`Pt1 : expect 7 : actual = ${runWith({ size: 1, file: "./day01/data_test.txt" })}`)
console.log(`Pt1 : answer = ${runWith({ size: 1, file: "./day01/data_real.txt" })}`)
console.log(`Pt2 : expect 5 : actual = ${runWith({ size: 3, file: "./day01/data_test.txt" })}`)
console.log(`Pt2 : answer = ${runWith({ size: 3, file: "./day01/data_real.txt" })}`)
console.log(`END   - day 1`)