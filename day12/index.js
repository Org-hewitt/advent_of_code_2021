#!/usr/bin/env node
const { readFile, getFileStrings } = require('../util/helpers');

const day = 12
const { test, real } = getFileStrings(day)

const isUppercase = x => x.toUpperCase() === x

const traverse = (graph, startFrom, visited, allow2ndVisit) => graph[startFrom].map(to => {
    if (to === 'end') return 1
    else if (isUppercase(to) || !visited.includes(to))
        return traverse(graph, to, visited.concat([to]), allow2ndVisit)
    else if (allow2ndVisit)
        return traverse(graph, to, visited.concat([to]), false)
    else
        return 0
}).reduce((a, b) => a + b, 0)

const safeAddGroup = (acc, start, end) => { acc[start] = acc[start] || []; acc[start].push(end) }

const run = ({ file, allow2ndVisit }) => {
    const graph = readFile(file).split("\n").map(line => line.split("-"))
        .reduce((acc, [start, end]) => {
            if (end !== 'start') safeAddGroup(acc, start, end)
            if (start !== "start") safeAddGroup(acc, end, start)
            return acc
        }, {})

    return traverse(graph, 'start', ['start'], allow2ndVisit)
}

console.log(`START - day ${day}\n`)
console.log(`PART - 1 : \n`)
console.log(`test data : expect          10 : actual = ${run({ allow2ndVisit: false, file: test })}`)
console.log(`real data : confirmed:    4912 : result = ${run({ allow2ndVisit: false, file: real })}`)
console.log(`PART - 2: \n`)
console.log(`test data : expect          36 : actual = ${run({ allow2ndVisit: true, file: test })}`)
console.log(`real data : confirmed:  150004 : result = ${run({ allow2ndVisit: true, file: real })}`)
console.log(`END - day ${day}\n`)