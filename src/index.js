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

const getJsFromXml = async (xmlString) => {
    return new Promise((resolve, reject) => {
        const parser = new xml2js.Parser()
        parser.parseString(xmlString, (error, results) => {
            resolve(results)
        })
    })
}

const main = async () => {
    console.clear()
    termBreak()
    const typesXmlString = getFileAsString(`db/types.xml`)
    const typesJsFromXml = await getJsFromXml(typesXmlString)
    console.log(typesJsFromXml)
}

main()
