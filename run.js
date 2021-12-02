const day = process.argv.find(x => x.includes("day="))
const chosenDay = day && day.split("day=")
if (chosenDay && chosenDay.length >= 2) {
    const [_, day] = chosenDay
    const iDay = parseInt(day)
    require(`./day${iDay}`)
} else {
    require(`./index.js`)
}
