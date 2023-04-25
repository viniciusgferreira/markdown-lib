import chalk from "chalk";

export default async function validateList(linksList) {
    const links = extractURL(linksList);
    const status = await checkStatus(links);
    return linksList.map((object, index) => ({
        ...object,
        status: status[index]
    }))
}

function extractURL(listLinks) {
    return listLinks.map((objectLink) => Object.values(objectLink).join())
}

async function checkStatus(listURLs) {
    const arrStatus = await Promise.all(
        listURLs.map(async (url) => {
            try {
                const response = await fetch(url);
                return `${response.status} - ${response.statusText}`;
            } catch (error) {
                return handleError(error)
            }
        })

    )
    return arrStatus
}

function handleError(error) {
    if (error.cause.code === 'ENOTFOUND') {
        return 'link not found'
    } else {
        return 'something went wrong'
    }
}