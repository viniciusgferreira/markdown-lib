import chalk from "chalk"
import extractLinks from "./index.js"
const path = process.argv[2]

async function processText(path) {
    const links = await extractLinks(path)
    console.log(chalk.yellow('list de links'), links)

}

processText(path)