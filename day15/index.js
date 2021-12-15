#!/usr/bin/env node
const { readFile, getFileStrings, getAdjacentPoints, toInt } = require('../util/helpers');

const day = 15;
const { test, real } = getFileStrings(day)

const a = [1, 2, 3]
console.log(a, a.shift())

const getShortest = (origin, target, allPoints, path, currentShortest) => {
    const { edges } = allPoints[origin]

    return edges
        .filter(e => !path.includes(e))
        .filter(e => {
            const risk = path.concat(e).map(p => allPoints[p].weight).reduce((a, b) => a + b)
            const isSmaller = risk < currentShortest[0]
            // if (!isSmaller) console.log(`pruning path with length ${path.length} and risk: ${risk}`)
            return isSmaller
        })
        .map(e => {
            if (e === target) {
                const fullPath = path.concat(target)
                const [_origin, ...riskPath] = fullPath // remove origin
                const risk = riskPath.map(p => allPoints[p].weight).reduce((a, b) => a + b)
                console.log(`found a route of risk: ${risk} with riskPath of: ${riskPath}`)
                currentShortest.pop()
                currentShortest.push(risk)
                return { path: fullPath, risk }
            }
            return getShortest(e, target, allPoints, path.concat(e), currentShortest)
        }).reduce((a, v) => v.risk < a.risk ? v : a, { risk: 999999999 })
}


const run = ({ file }) => {
    const lines = readFile(file).split("\n")
    const points = {}
    const maxY = lines.length - 1
    const maxX = lines[0].length - 1
    for (let y = 0; y <= maxY; y++) {
        const line = lines[y]
        for (let x = 0; x <= maxX; x++) {
            const key = `(${x},${y})`
            const adjs = getAdjacentPoints({ point: [x, y], maxX, maxY }).map(([x, y]) => `(${x},${y})`)
            points[key] = { key, weight: toInt(line[x]), edges: adjs }
        }
    }

    const origin = "(0,0)"
    const target = `(${maxX},${maxY})`
    const answer = getShortest(origin, target, points, [origin], [2000])

    console.log(answer)

    return answer.risk
}

console.log(`START - day ${day}\n`)
console.log(`PART - 1 : \n`)
console.log(`test data : expect     40 : actual = ${run({ file: test })}`)
console.log(`real data : confirmed: xxx : result = ${run({ file: real })}\n`)
// console.log(`PART - 2: \n`)
// console.log(`test data : expect     xxx : actual = ${run({ file: test })}`)
// console.log(`real data : confirmed: xxx : result = ${run({ file: real })}\n`)
console.log(`END - day ${day}\n`)