#!/usr/bin/env node
const { readFile, getFileStrings, getAdjacentPoints, toInt } = require('../util/helpers');
var { find_path } = require('dijkstrajs');

const day = 15;
const { test, real } = getFileStrings(day)

const run = ({ file, convertArray }) => {
    const lines = convertArray(readFile(file).split("\n"))
    const points = {}
    const maxY = lines.length - 1
    const maxX = lines[0].length - 1
    for (let y = 0; y <= maxY; y++) {
        const line = lines[y]
        for (let x = 0; x <= maxX; x++) {
            const key = `(${x},${y})`
            const edges = getAdjacentPoints({ point: [x, y], maxX, maxY })
                .filter(([_, y1]) => x === maxX ? y1 >= y : true)
                .filter(([x1, _]) => y === maxY ? x1 >= x : true)
                .map(([x, y]) => `(${x},${y})`)
            points[key] = { weight: toInt(line[x]), edges }
        }
    }

    // console.log(points)

    const origin = "(0,0)"
    const target = `(${maxX},${maxY})`

    const graph = {}

    Object.entries(points).forEach(([key, value]) => {
        const nodesFromKey = {}
        for (let edge of value.edges) {
            nodesFromKey[edge] = points[edge].weight
        }
        graph[key] = nodesFromKey
    })

    const r = find_path(graph, origin, target)
    r.shift() // get rid of origin
    return r.map(p => points[p].weight).reduce((a, b) => a + b)
}

const pt1 = (lines) => lines
const pt2 = (lines) => {
    const orig = lines.map(line => {
        let last = line.split("").map(toInt)
        const output = [...last]
        for (let i = 0; i < 4; i++) {
            last = last.map(n => n === 9 ? 1 : ++n)
            output.push(...last)
        }
        return output.reduce((a, v) => `${a}${v}`, "")
    })

    const output = [...orig]
    let last = orig
    for (let i = 0; i < 4; i++) {
        last = last.map(line => line.split("")
            .map(toInt)
            .map(n => n === 9 ? 1 : ++n)
            .reduce((a, v) => `${a}${v}`, "")
        )
        output.push(...last)
    }

    return output.reduce((a, v) => {
        a.push(v)
        return a
    }, [])
}

console.log(`START - day ${day}\n`)
console.log(`PART - 1 : \n`)
console.log(`test data : expect     40 : actual = ${run({ file: test, convertArray: pt1 })}`)
console.log(`real data : correct : 748 : result = ${run({ file: real, convertArray: pt1 })}\n`)
console.log(`PART - 2: \n`)
console.log(`test data : expect    315 : actual = ${run({ file: test, convertArray: pt2 })}`)
console.log(`real data : correct: xxx : result = ${run({ file: real, convertArray: pt2 })}`)
console.log(`END - day ${day}\n`)