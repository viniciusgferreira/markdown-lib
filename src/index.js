import chalk from "chalk";
import fs from 'node:fs'

function handleError(error) {
    throw new Error(chalk.red(error.code, 'Arquivo não encontrado'))
}

async function fetchFile(path) {
    try {
        const encoding = 'utf-8';
        const text = await fs.promises.readFile(path)
        return text.toString();
    } catch (error) {
        handleError(error)
    }
}

async function extractLinksFromFile(path) {
    const text = await fetchFile(path)
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^^\s]*)\)/gm;
    const links = [...text.matchAll(regex)]
    const extractedLinks = links.map((item) => ({ [item[1]]: item[2] }));
    return extractedLinks.length !== 0 ? extractedLinks : 'Não há links no arquivo.';
}


export default extractLinksFromFile