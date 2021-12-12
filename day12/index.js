#!/usr/bin/env node
const { readFile, log } = require('../util/helpers');

const day = 12;
const test = `./day${day}/data_test.txt`
const real = `./day${day}/data_real.txt`

const isUppercase = x => x.toUpperCase() === x
const visitCount = (x, visited) => visited.filter(a => a === x).length
const pt1 = () => (to, visited) => isUppercase(to) || !visited.includes(to)
const pt2 = (twoVisitsOf) => (to, visited) => {
    if (isUppercase(to)) return true
    if (twoVisitsOf === to) return [0, 1].includes(visitCount(to, visited))
    return [0].includes(visitCount(to, visited))
}

const flatten = (arr, result) => {
    arr.forEach(item => {
        if (typeof item === 'object' && typeof item[0] === 'string') {
            result.push(item)
        } else {
            return flatten(item, result)
        }
    });
}

const traverse = (graph, startFrom, visited, canVisit) => {
    const safeVisited = [...(visited || [])]
    const canGoTo = graph[startFrom].filter(to => canVisit(to, visited))
    return canGoTo.map(to => {
        if (to === 'end') return safeVisited.concat(to)
        return traverse(graph, to, safeVisited.concat([to]), canVisit)
    }).filter(x => x.length > 0)
}


const run = ({ file, canVisit }) => {
    const graph = readFile(file).split("\n")
        .map(line => line.split("-"))
        .reduce((acc, [start, end]) => {
            if (end !== 'start') {
                const startGroup = acc[start] || []
                startGroup.push(end)
                acc[start] = startGroup
            }
            if (start !== "start") {
                const endGroup = acc[end] || []
                endGroup.push(start)
                acc[end] = endGroup
            }

            return acc
        }, {})


    const routes = []
    const nodes = Object.keys(graph)
    for (let node of nodes) {
        const loopRoutes = []
        flatten(traverse(graph, 'start', ['start'], canVisit(node)), loopRoutes)
        for (let l of loopRoutes) {
            const jRoute = JSON.stringify(l)
            if (!routes.includes(jRoute)) routes.push(jRoute)
        }
    }

    return routes.length
}

console.log(`START - day ${day}\n`)
console.log(`PART - 1 : \n`)
console.log(`test data : expect          10 : actual = ${run({ canVisit: pt1, file: test })}`)
console.log(`test data : expect          19 : actual = ${run({ canVisit: pt1, file: `./day${day}/data_test2.txt` })}`)
console.log(`test data : expect         226 : actual = ${run({ canVisit: pt1, file: `./day${day}/data_test3.txt` })}`)
console.log(`real data : confirmed:    4912 : result = ${run({ canVisit: pt1, file: real })}\n`)
console.log(`PART - 2: \n`)
console.log(`test data : expect          36 : actual = ${run({ canVisit: pt2, file: test })}`)
console.log(`real data : confirmed:  150004 : result = ${run({ canVisit: pt2, file: real })}\n`)
console.log(`END - day ${day}\n`)