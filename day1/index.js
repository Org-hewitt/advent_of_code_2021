#!/usr/bin/env node
const { readFile } = require('../util/helpers');


const hasGroupOf = (size) => (_val, index, array) => {
    const maxSize = array.length;
    return index + size <= maxSize;
}

const getGroupSizeOf = (size, array) => (_val, index) => {
    const result = [];
    for (let x = 0; x < size; x++) {
        result.push(array[index + x]);
    }
    return result;
}
const sumGroup = (vals) => vals.reduce((a, b) => a + b);

const runWith = ({ size, file }) => {
    const allDepths = readFile(file).split("\n").map(s => parseInt(s));
    return allDepths
        .filter(hasGroupOf(size))
        .map(getGroupSizeOf(size, allDepths))
        // .map(println)
        .map(sumGroup)
        .reduce((acc, current, index, arr) => {
            const lastVal = index - 1 >= 0 ? arr[index - 1] : undefined
            if (lastVal && current > lastVal) return acc + 1;
            return acc;
        }, 0);
}

console.log(`START  day 1`)
console.log(`TEST data`)
console.log(`part1: increased in depth ${runWith({ size: 1, file: "./day1/data_test.txt" })} times`)
console.log(`part2: increased in depth ${runWith({ size: 3, file: "./day1/data_test.txt" })} times`)

console.log(`REAL data`)
console.log(`part1: increased in depth ${runWith({ size: 1, file: "./day1/data_real.txt" })} times`)
console.log(`part2: increased in depth ${runWith({ size: 3, file: "./day1/data_real.txt" })} times`)

console.log(`END OF day 1`)