const fs = require('fs')
const path = require('path')
var clc = require("cli-color")

const contactsPath = path.join(__dirname + '/db/contacts.json')

const listContacts = () => {
  try {
    const data = fs.readFileSync(contactsPath, 'utf8')
    let resultArr = JSON.parse(data)
   
    process.stdout.write(
  clc.columns([
    [clc.yellow.bold("ID "), clc.yellow.bold("     NAME     "), clc.yellow.bold("EMAIL"), clc.yellow.bold("PHONE")]
  ])
    );

      process.stdout.write(
        clc.columns([
          resultArr.map(({ id, name, email, phone }) => (`[ ${clc.yellow(id)}, ${name} ${email} ${phone}],`)
        ])
  
);

  //  console.log(resultArr)
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

const deleteContactById = (contactId) => {

  const dataToJson = JSON.stringify(listContacts().filter(contact => contact.id !== contactId))
  
    try {
          fs.writeFileSync(contactsPath, dataToJson)
          console.log('Deleted!')
         //file written successfully
    } catch (err) {
      console.error(err)
      }
}
 
module.exports = {
  listContacts, getContactById, addContactById, deleteContactById
}
