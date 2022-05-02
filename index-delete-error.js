var _ = require('lodash')
const fs = require('fs')
const path = require('path')
const errors = require('./db/broken.json')
const action = require('./delete_broken')
const array = require('./db/fix_array.json')
const f = require('./convert-json-2-csv')

const clear_arr = path.join(__dirname + '/db/fix_array.json')
const res_arr = path.join(__dirname + '/db/poll.csv')

const deleteErrors = () => {
    let newArray = array        

    errors.map((error) => {
        const result = action.deleteError(error, newArray)
        newArray = result
    })

    return fs.writeFileSync(clear_arr, JSON.stringify(newArray))
}

const newCsv = () => {
    const resArray = f.convertToCSV(array)
    fs.writeFileSync(res_arr, JSON.stringify(resArray))
}

newCsv()

//deleteErrors()









