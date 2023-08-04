const fs = require('fs')

function htmlViewEngine(filePath, options, callback){
    fs.readFile(filePath, 'utf8', (err, content) =>{
        if(err) return callback(err)
    
    const rendered = content

    return callback(null, rendered)
    
    })
}

module.exports = htmlViewEngine