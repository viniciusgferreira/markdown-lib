import chalk from "chalk"
import extractLinks from "./index.js"
import fs from 'node:fs'

const path = process.argv[2]

function printList(links, filename = '') {
    console.log(chalk.bgYellow(`lista de links do arquivo ${path}/${filename}`), links)

}

async function processText() {

    try {
        if (fs.lstatSync(path).isFile()) {
            const links = await extractLinks(path)
            printList(links)
        } else if (fs.lstatSync(path).isDirectory()) {
            const files = await fs.promises.readdir(path)
            files.forEach(async (file) => {
                const links = await extractLinks(`${path}/${file}`)
                printList(links, file);
            })
        }

    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log(chalk.red('arquivo ou diretório não existe'))
            return
        }
    }
}



processText()