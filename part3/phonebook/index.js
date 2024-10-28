require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const Person = require('./models/person')
const app = express()



app.use(morgan('tiny'))
app.use(express.json())
app.use(express.static('dist'))


app.use(cors())

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(result => {
    console.log('phonebook:');
    result.forEach(p => {
      console.log(`${p.name} ${p.number}`)
    })
    response.json(result)
  })
})

app.get('/info', (request, response) => {
    const date = new Date()
    Person.find({}).then(result => {
      response.send(`<div><p>Phonebook has info for ${result.length} people</p><p>${date.toString()}</p></div> `)
    })
    
  })
app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    Person.find({id}).then(result => {
      if (result) {
        response.json(result)
      } else {
      response.status(404).end()
      }
    })
})
app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    Person.find({id}).then(result => {
      if (result) {
        response.status(204).end()
      } else {
      response.status(404).end()
      }
    })
})

app.post('/api/persons', (request, response) => {
    const person = request.body
    if (!person.name || !person.number) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
    // const p = persons.find(_ => _.name === person.name)
    
    // if(p) {
    //   return response.status(400).json({ 
    //     error: 'name must be unique' 
    //   }) 
    // }
    const id = Math.floor(Math.random() * 1000000)

    const p = new Person({...person, id})
    p.save().then(result => {
      mongoose.connection.close()
      response.json(person)
    })
  })

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})







