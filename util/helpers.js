var fs = require("fs");

const readFile = (path) => fs.readFileSync(path, { encoding: 'utf8' });

exports.readFile = readFile