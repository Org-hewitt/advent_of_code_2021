#!/usr/bin/env node
const { readFile } = require('../util/helpers');

const day = 4;
const test = `./day${day}/data_test.txt`
const real = `./day${day}/data_real.txt`

const findInRow = (input, sNum) => {
    if (input.find(x => x === sNum)) {
        const newVals = input.map(x => x === sNum ? parseInt(sNum) : x)
        for (i = 0; i < input.length; i++) {
            input[i] = newVals[i]
        }
    }
}

// the board has row data stored as strings
// when we match, we set to number
// as these highlight differently in the console.log
// also we can check for win condition by finding numbers
const newBoard = (index) => {
    const grid = [[], [], [], [], []]

    return {
        print: () => {
            console.log(`<board index=${index}>`)
            for (row of grid) console.log(row)
            console.log("</board>")
        },
        setRow: (sRow) => {
            const items = sRow.split(" ").map(x => x.trim()).filter(x => x != "")
            const nextR = grid.find(r => r.length === 0)
            if (nextR) nextR.push(...items)
        },
        sumUnMarked: () => grid.map(row => row.filter(x => typeof x === 'string').map(x => parseInt(x)))  // num[]
            .reduce((a, b) => a.concat(b))
            .reduce((a, b) => a + b)
        ,
        nextDraw: (num) => {
            grid.forEach(row => findInRow(row, num))

            for (row of grid) if (row.every(x => typeof x === "number")) return true
            for (i = 0; i < grid[0].length; i++) if (grid.map(row => row[i]).every(x => typeof x === "number")) return true

            return false;
        }
    }
}

const run = ({ file, newBoard }) => {
    const input = readFile(file).split("\n")
    const drawNumbers = input.shift().split(",")
    const boards = []
    let boardIndex = 0;

    // push all the data into the models
    for (line of input) {
        if (line.trim().length === 0) boards.push(newBoard(boardIndex++))
        else boards[boardIndex - 1].setRow(line)
    }

    // run through the draw numbers
    let result = 0
    for (num of drawNumbers) {
        const boardWon = boards.find(b => b.nextDraw(num))
        if (boardWon) {
            boardWon.print()
            result = boardWon.sumUnMarked() * num
            break;
        }
    }

    return result
}

console.log(`START - day ${day}\n`)
console.log(`Pt1 : expect 4512 : actual = ${run({ file: test, newBoard })}\n\n`)
console.log(`Pt2 : expect xxx : actual = ${run({ file: real, newBoard })}\n\n`)

// console.log(`Pt1 : answer = ${run({ file: real })}`)
// console.log(`Pt2 : answer = ${run2({ file: real })}\n`)
console.log(`END   - day ${day}\n`)