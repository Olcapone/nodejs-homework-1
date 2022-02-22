const fs = require('fs')
const path = require('path')
var clc = require("cli-color")

const contactsPath = path.join(__dirname + '/db/contacts.json')

const getContacts = () => {
   try {
    const data = fs.readFileSync(contactsPath, 'utf8')
    const formattedData = JSON.parse(data)
    return formattedData

  } catch (err) {
      console.error(err)
  }
}

const getContactById =  (contactId) => getContacts().filter(contact => contact.id === contactId)

const listContacts = () => console.table(getContacts())

const addContactById = (data) => {

  const dataToJson = JSON.stringify([...getContacts(), data])
  try {
    if (!getContactById(data.id).length) {
      fs.writeFileSync(contactsPath, dataToJson)
      return 'File written successfully!'
    }
    else { return `Сontact ${data.name} already exists!` }
  } catch (err) {
      console.error(err)
    }
}

const deleteContactById = (contactId) => {

  const dataToJson = JSON.stringify(getContacts().filter(contact => contact.id !== contactId))
  
    try {
      fs.writeFileSync(contactsPath, dataToJson)
      return 'Deleted!'
    } catch (err) {
      console.error(err)
      }
}
 
module.exports = {
  listContacts, getContactById, addContactById, deleteContactById
}
