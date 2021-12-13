#!/usr/bin/env node
const { readFile, toInt, getFileStrings } = require('../util/helpers');

const day = 13;
const { test, real } = getFileStrings(day)

const selectPoint = ([x, y], paper) => paper[y] = paper[y].map((a, i) => i === x ? "#" : a)
const union = (a1, a2) => a1.map((v, i) => [v, a2[i]].includes("#") ? "#" : ".")

const foldY = (sInstruction, paper) => foldYAt(toInt(sInstruction.split("=")[1]), paper)
const foldYAt = (index, paper) => paper.filter((_, i) => i < index).map((v, i) => union(v, paper[index + index - i]))

const foldX = (sInstruction, paper) => foldXAt(toInt(sInstruction.split("=")[1]), paper)
const foldXAt = (i, paper) => paper.map(l => union(l.slice(0, i), l.slice(i + 1, l.length).reverse()))

const run = ({ file, allowXFolds, printFn }) => {
    const input = readFile(file).split("\n")
    const [maxX, maxY] = input.filter(x => x.indexOf(",") > 0).map(s => s.split(",").map(toInt))
        .reduce(([a, b], [x, y]) => [a > x ? a : x, b > y ? b : y], [0, 0])
    let paper = []
    let folds = 0
    for (let y = 0; y <= maxY; y++) paper.push(Array(maxX + 1).fill("."))
    for (let line of input) {
        if (line.indexOf(",") >= 0) selectPoint(line.split(",").map(toInt), paper)
        else if (folds < allowXFolds && line.indexOf("y") >= 0) { paper = foldY(line, paper); folds++ }
        else if (folds < allowXFolds && line.indexOf("x") >= 0) { paper = foldX(line, paper); folds++ }
    }

    printFn(paper)

    return paper.reduce((acc, l) => acc + l.filter(x => x === "#").length, 0)
}

const printFn = paper => { for (a of paper) console.log(a.join("")) }

console.log(`START - day ${day}\n`)
console.log(`PART - 1 : \n`)
console.log(`test data : expect           17 : actual = ${run({ file: test, allowXFolds: 1, printFn: () => { } })}`)
console.log(`real data : confirmed:      724 : result = ${run({ file: real, allowXFolds: 1, printFn: () => { } })}\n`)
console.log(`PART - 2: \n`)
console.log(`test data : expect           16 : actual = ${run({ file: test, allowXFolds: 99999, printFn })}`)
console.log(`real data : confirmed: CPJBERUL : result = ${run({ file: real, allowXFolds: 99999, printFn })}\n`)
console.log(`END - day ${day}\n`)