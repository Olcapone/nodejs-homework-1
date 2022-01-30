const fs = require('fs')
const path = require('path')

const contactsPath = path.join(__dirname + '/db/contacts.json')

const listContacts = () => {
  try {
      const data = fs.readFileSync(contactsPath, 'utf8')
      return JSON.parse(data)
  } catch (err) {
      console.error(err)
  }
}

function getContactById(contactId) {
    return listContacts().filter(contact => contact.id === contactId)
}

const addContactById = (data) => {
    const dataToJson = JSON.stringify([...listContacts(), data])
    try {
        if (getContactById(data.id).lenth === 0) {
          fs.writeFileSync(contactsPath, dataToJson)
          console.log('Done!')
         //file written successfully
        }
    } catch (err) {
      console.error(err)
      }
}
 
module.exports = {
  listContacts, getContactById, addContactById
}
