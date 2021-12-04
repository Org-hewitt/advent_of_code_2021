#!/usr/bin/env node
const { readFile } = require('../util/helpers');

const day = 4;
const test = `./day${day}/data_test.txt`
const real = `./day${day}/data_real.txt`

const updateRowIfFound = (input, sNum) => {
    if (input.find(x => x === sNum)) {
        const newVals = input.map(x => x === sNum ? parseInt(sNum) : x)
        for (i = 0; i < input.length; i++) {
            input[i] = newVals[i]
        }
        return true
    }
    return false
}

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
            grid.find(row => updateRowIfFound(row, num))
        },
        hasWon: () => {
            for (row of grid) if (row.every(x => typeof x === "number")) return true
            for (i = 0; i < grid[0].length; i++) if (grid.map(row => row[i]).every(x => typeof x === "number")) return true

            return false;
        }
    }
}

const run = ({ file, newBoard, winCondition }) => {
    const input = readFile(file).split("\n")
    const drawNumbers = input.shift().split(",")
    let boards = []
    let boardIndex = 0;

    // push all the data into the models
    for (line of input) {
        if (line.trim().length === 0) boards.push(newBoard(boardIndex++))
        else boards[boardIndex - 1].setRow(line)
    }

    let result = 0
    const wonBoards = []
    for (num of drawNumbers) {
        // run through the draw numbers
        for (board of boards) board.nextDraw(num)

        const winsThisTurn = boards.filter(b => b.hasWon())
        boards = boards.filter(b => !winsThisTurn.includes(b))


        const boardWon = winCondition({ winsThisTurn, boards })
        if (boardWon) {
            boardWon.print()
            result = boardWon.sumUnMarked() * num
            break;
        }
    }

    return result
}

const pt1 = ({ winsThisTurn }) => winsThisTurn.find(x => true)
const pt2 = ({ winsThisTurn, boards }) => {
    if (boards.length === 0) return winsThisTurn[0]
}

console.log(`START - day ${day}\n`)
console.log(`Pt1 : expect 4512 : actual = ${run({ file: test, newBoard, winCondition: pt1 })}\n\n`)
console.log(`Pt2 : expect 1924 : actual = ${run({ file: test, newBoard, winCondition: pt2 })}\n\n`)

console.log(`Pt1 : answer = ${run({ file: real, newBoard, winCondition: pt1 })}\n\n`)
console.log(`Pt2 : answer = ${run({ file: real, newBoard, winCondition: pt2 })}\n\n`)
console.log(`END   - day ${day}\n`)