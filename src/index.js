const fs = require('fs')
const xml2js = require('xml2js')

const termBreak = () => {
    for (let i = 0; i < process.stdout.columns; i++) {
        process.stdout.write('*')
    }
}

const getFileAsString = (pathName) => {    
    const file = fs.readFileSync(`./dayzOffline.chernarusplus/${pathName}`, 'utf8')
    return file
}

const putFileAsString = (pathName, fileAsString) => {    
    const file = fs.writeFileSync(`./dayzOffline.chernarusplus/${pathName}`, fileAsString, 'utf8')
    return file
}

const getJsFromXml = async (xmlString) => {
    return new Promise((resolve, reject) => {
        const parser = new xml2js.Parser()
        parser.parseString(xmlString, (error, results) => {
            resolve(results)
        })
    })
}

const getStringFromJs = async (js) => {
    return new Promise((resolve, reject) => {
        const builder = new xml2js.Builder({ renderOpts: { 'pretty': true, 'indent': `    `, 'newLine': `\n` } })
        const xmlStringFromJs = builder.buildObject({ ...js })
        resolve(xmlStringFromJs)
    })
}

const main = async () => {
    console.clear()
    termBreak()
    const typesXmlString = getFileAsString(`db/types.xml`)
    const typesJsFromXml = await getJsFromXml(typesXmlString)
    const typesXmlStringFromJs = await getStringFromJs(typesJsFromXml)
    putFileAsString(`db/types.xml`, typesXmlStringFromJs)
}

main()
