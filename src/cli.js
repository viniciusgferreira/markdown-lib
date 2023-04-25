import fs from 'node:fs'
import chalk from "chalk"
import extractLinksFromFile from "./index.js"
import validateList from './http-validate.js'

async function printList(validate, links, fullFileName = '') {
    if (validate) {
        console.log(
            chalk.bgYellow(`lista validada ${fullFileName}`), await validateList(links))
    } else {
        console.log(chalk.bgYellow(`lista de links de ${fullFileName}`), links)
    }

}

async function processText() {
    const path = process.argv[2]
    const validate = process.argv[3] === '--validate';

    try {
        if (fs.lstatSync(path).isFile()) {
            const links = await extractLinksFromFile(path)
            printList(validate, links, `${path}`)
        } else if (fs.lstatSync(path).isDirectory()) {
            const files = await fs.promises.readdir(path)
            files.forEach(async (file) => {
                const links = await extractLinksFromFile(`${path}/${file}`)
                printList(validate, links, `${path}${file}`);
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