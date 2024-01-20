const mongoose = require('mongoose')
require('dotenv').config()
mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

mongoose.connect(url)
  // eslint-disable-next-line no-unused-vars
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({name: process.argv[2], number: process.argv[3]})

person.save().then(() => {
  console.log('person saved')
  mongoose.connection.close()
})
Person.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})