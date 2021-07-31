const cors = require('cors')
const express = require('express')
const morgan = require('morgan')

const app = express()

app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())

let persons = [
    {
      "id": 1,
      "name": "Arto Hellas",
      "number": "040-123456"
    },
    {
      "id": 2,
      "name": "Ada Lovelace",
      "number": "39-44-5323523"
    },
    {
      "id": 3,
      "name": "Dan Abramov",
      "number": "12-43-234345"
    },
    {
      "id": 4,
      "name": "Mary Poppendieck",
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
  })

  const generateId = () => {
    return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
  }

  app.post('/api/persons', (request, response) => {
    const name = request.body.name
    const number = request.body.number
    if (!name || !number) {
      return response.status(400).json({
        error: 'content missing'
      })
    }

    if (persons.some(p => p.name === name)) {
      return response.status(400).json({
        error: 'name must be unique'
      })
    }

    const person = {
      id: generateId(),
      name: name,
      number: number
    }

    persons = persons.concat(person)

    response.json(person)
  })

app.get('/info', (request, response) => {
    response.write(`<div>Phonebook has info for ${persons.length} people</div>`)
    response.write(`<div>${new Date().toString()}</div>`)
    response.end()

})

const PORT = process.env.PORT || 3001
// bind ip adress for wsl2
app.listen(PORT, '0.0.0.0',  () => {
    console.log(`Server running on port ${PORT}`)
})