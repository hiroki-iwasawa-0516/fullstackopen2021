require('dotenv').config()

const cors = require('cors')
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()

app.use(express.static('build'))

app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())

const errorHandler = (error, request, response, next) => {
    console.error("aaaa")
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})


app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.post('/api/persons', (request, response) => {
    const name = request.body.name
    const number = request.body.number
    if (!name || !number) {
        return response.status(400).json({
            error: 'content missing'
      })
    }

    const person = new Person({
      name: name,
      number: number
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

app.use(errorHandler)

const PORT = process.env.PORT
// bind ip adress for wsl2
app.listen(PORT, '0.0.0.0',  () => {
    console.log(`Server running on port ${PORT}`)
})