#!/usr/bin/env node
const { readFile } = require('./helpers');

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
const println = (val) => {
    console.log(val);
    return val;
}

// const data = readFile("./day1/data_test.txt");
const data = readFile("./day1/data_real.txt");


const allDepths = data.split("\n").map(s => parseInt(s));
const sizeOfGroup = 3;
const increasingDepths = allDepths
    .filter(hasGroupOf(sizeOfGroup))
    .map(getGroupSizeOf(sizeOfGroup, allDepths))
    // .map(println)
    .map(sumGroup)
    .reduce((acc, current, index, arr) => {
        const lastVal = index - 1 >= 0 ? arr[index - 1] : undefined
        if (lastVal && current > lastVal) return acc + 1;
        return acc;
    }, 0);

console.log(`increased in depth ${increasingDepths} times`);

