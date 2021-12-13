#!/usr/bin/env node
const { readFile, getFileStrings } = require('../util/helpers');

const day = 4;
const { test, real } = getFileStrings(day)

const IsNumber = (x) => typeof x === 'number'
const IsString = (x) => typeof x === 'string'
const ToInt = (s) => parseInt(s)

const handleCall = (row, sCalledNumber) => {
    if (row.find(x => x === sCalledNumber)) {
        for (i = 0; i < row.length; i++) row[i] = row[i] === sCalledNumber ? ToInt(sCalledNumber) : row[i]
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
        callNumber: (num) => { rows.find(row => handleCall(row, num)) },
        hasWon: () => {
            for (row of rows) if (row.every(IsNumber)) return true
            for (i = 0; i < rows[0].length; i++) if (rows.map(row => row[i]).every(IsNumber)) return true
            return false;
        }
    }
}

const run = ({ file, newBoard, winCondition }) => {
    const [numbers, ...grids] = readFile(file).split("\n")
    let boards = []
    let boardIndex = -1;

    for (l of grids) {
        if (l.length === 0) boards.push(newBoard(++boardIndex))
        else boards[boardIndex].setRow(l)
    }

    for (num of numbers.split(",")) {
        for (b of boards) b.callNumber(num)

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
const pt2 = ({ winsThisTurn, boards }) => { if (boards.length === 0) return winsThisTurn[0] }

console.log(`START - day ${day}\n`)
console.log(`Pt1 : expect 4512 : actual = ${run({ file: test, newBoard, winCondition: pt1 })}\n\n`)
console.log(`Pt2 : expect 1924 : actual = ${run({ file: test, newBoard, winCondition: pt2 })}\n\n`)

console.log(`Pt1 : answer = ${run({ file: real, newBoard, winCondition: pt1 })}\n\n`)
console.log(`Pt2 : answer = ${run({ file: real, newBoard, winCondition: pt2 })}\n`)
console.log(`END   - day ${day}\n`)