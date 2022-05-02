const fs = require('fs')
const path = require('path')
const mockPath = path.join(__dirname + '/db/poolW.csv')
const csv_arr = path.join(__dirname + '/db/csv_array.json')

function csvToArray(str, delimiter = ",") {
    const headers = str.slice(0, str.indexOf("\n")).split(delimiter)
    const rows = str.slice(str.indexOf("\n") + 1).split("\n")

    const arr = rows.map(function (row) {
    const values = row.split(delimiter)
    const el = headers.reduce(function (object, header, index) {
      object[header] = values[index]
      return object
    }, {})
    return el
    })
    fs.writeFileSync(csv_arr, JSON.stringify(arr))
      return 'File written successfully!'
}

const getArr = () => {
     try {
    const data = fs.readFileSync(mockPath, 'utf8')
    console.log(csvToArray(data))

  } catch (err) {
      console.error(err)
  }
}

getArr()
