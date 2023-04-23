import chalk from "chalk";
import fs from 'node:fs'

function handleError(error) {
    throw new Error(chalk.red(error.code, 'Arquivo não encontrado'))
}

async function fetchFile(path) {
    try {
        const encoding = 'utf-8';
        const text = await fs.promises.readFile(path)
        //console.log(chalk.bgBlackBright.cyan(text))
        return text.toString();
    } catch (error) {
        handleError(error)
    }
}

function extractLinks(text) {
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^^\s]*)\)/gm;
    const links = [...text.matchAll(regex)]
    const extractedLinks = links.map((item) => ({ [item[1]]: item[2] }));
    return extractedLinks;
}

const extractedLinks = extractLinks(await fetchFile('./arquivos/texto.md'))
console.log(extractedLinks)

