const fs = require('fs')
const path = require('path')

const textPath = path.join(__dirname + '/db/broken.txt')

function getText() {    
    try {
      const data = fs.readFileSync(textPath, 'utf8')
      return data

    } catch (err) {
      console.error(err)
    }
}

const addComma = () => {
    try {
       fs.writeFileSync(textPath, getText().replace(/\r\n/gi, '","'))
       return 'changed!'
     } catch (err) {
       console.error(err)
       }
}
    
addComma()
