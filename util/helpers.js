var fs = require("fs");

const readFile = (path) => fs.readFileSync(path, { encoding: 'utf8' });
const toInt = x => parseInt(x)
const log = preface => x => console.log(preface, x)
const getDiagonals = ([x, y]) => [[x - 1, y - 1], [x + 1, y - 1], [x - 1, y + 1], [x + 1, y + 1]]
const getOrthogonal = ([x, y]) => [[x, y - 1], [x - 1, y], [x + 1, y], [x, y + 1]]
const getAdjacentPoints = ({ point: [x, y], maxX, maxY, includeDiagonal = false }) =>
    getOrthogonal([x, y]).concat(includeDiagonal ? getDiagonals([x, y]) : [])
        .filter(([x, y]) => x >= 0 && y >= 0)
        .filter(([x, y]) => x <= maxX && y <= maxY)


module.exports = {
    readFile,
    toInt,
    log,
    getAdjacentPoints
}
