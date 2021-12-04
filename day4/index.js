#!/usr/bin/env node
const { readFile } = require('../util/helpers');

const day = 4;
const test = `./day${day}/data_test.txt`
const real = `./day${day}/data_real.txt`

const IsNumber = (x) => typeof x === 'number'
const IsString = (x) => typeof x === 'string'
const ToInt = (s) => parseInt(s)

const updateRowWithDraw = (input, sDrawNum) => {
    if (input.find(x => x === sDrawNum)) {
        // flip sNum => iNum so it prints different in console
        for (i = 0; i < input.length; i++) input[i] = input[i] === sDrawNum ? ToInt(sDrawNum) : input[i]
        return true
    }
    return false
}

const newBoard = (index) => {
    const rows = [[], [], [], [], []]

    return {
        print: () => {
            console.log(`<board index=${index}>`)
            for (row of rows) console.log(row)
            console.log("</board>")
        },
        setRow: (sRow) => {
            const items = sRow.split(" ").map(x => x.trim()).filter(x => x != "")
            const nextRow = rows.find(r => r.length === 0)
            if (nextRow) nextRow.push(...items)
        },
        sumUnMarked: () => rows.map(row => row.filter(IsString).map(ToInt))  // num[]
            .reduce((a, b) => a.concat(b))
            .reduce((a, b) => a + b)
        ,
        nextDraw: (num) => {
            rows.find(row => updateRowWithDraw(row, num))
        },
        hasWon: () => {
            for (row of rows) if (row.every(IsNumber)) return true
            for (i = 0; i < rows[0].length; i++) if (rows.map(row => row[i]).every(IsNumber)) return true
            return false;
        }
    }
}

const run = ({ file, newBoard, winCondition }) => {
    const input = readFile(file).split("\n")
    const drawNumbers = input.shift().split(",")
    let boards = []
    let boardIndex = 0;

    for (line of input) {
        if (line.trim().length === 0) boards.push(newBoard(boardIndex++))
        else boards[boardIndex - 1].setRow(line)
    }

    for (num of drawNumbers) {
        for (board of boards) board.nextDraw(num)

        const winsThisTurn = boards.filter(b => b.hasWon())
        boards = boards.filter(b => !winsThisTurn.includes(b))

        const winningBoard = winCondition({ winsThisTurn, boards })
        if (winningBoard) {
            winningBoard.print()
            return winningBoard.sumUnMarked() * num
        }
    }

    return "??"
}

const pt1 = ({ winsThisTurn }) => winsThisTurn.length && winsThisTurn[0]
const pt2 = ({ winsThisTurn, boards }) => {
    if (boards.length === 0) return winsThisTurn[0]
}

console.log(`START - day ${day}\n`)
console.log(`Pt1 : expect 4512 : actual = ${run({ file: test, newBoard, winCondition: pt1 })}\n\n`)
console.log(`Pt2 : expect 1924 : actual = ${run({ file: test, newBoard, winCondition: pt2 })}\n\n`)

console.log(`Pt1 : answer = ${run({ file: real, newBoard, winCondition: pt1 })}\n\n`)
console.log(`Pt2 : answer = ${run({ file: real, newBoard, winCondition: pt2 })}\n`)
console.log(`END   - day ${day}\n`)