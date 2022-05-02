const fs = require('fs')
const path = require('path')
const csv_arr = path.join(__dirname + '/db/csv_array.json')


const getItem = () => {
   try {
    const data = fs.readFileSync(csv_arr, 'utf8')
    const formattedData = JSON.parse(data)
    return formattedData

  } catch (err) {
      console.error(err)
  }
}

const deleteError = (itemId, array) => {
    const modifiedArray = array.filter((item) => {
      return Object.values(item).includes(itemId) ? '' : item
    })

     return modifiedArray
}

module.exports = {
  deleteError, getItem
}
