require('dotenv').config()
const express = require('express')
const Entry = require('./models/entry')
const morgan = require('morgan')
const cors = require('cors')
const app = express()




app.use(express.json())


app.use(morgan(':method :url :status :response-time ms :body'))
app.use(cors())
app.use(express.static('dist'))

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456"
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523"
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345"
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122"
  }
]

morgan.token('body', (req) => {
    if (req.method === 'POST' && req.body) {
        return JSON.stringify(req.body)
    }
    return ""
})


app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
    Entry.find({}).then((entry) => {
        response.json(entry)
    })
})



app.get('/info', (request, response) => {
    Entry.countDocuments({})
        .then(count => {
            const datenow = new Date().toString()
            response.send(`
                Phonebook has info for ${count} people<br>
                ${datenow}`)
        })
        .catch(error => next(error))

    
})


app.get('/api/persons/:id', (request, response, next) => {
    Entry.findById(request.params.id)
        .then(entry => {
            if (entry) {
                response.json(entry)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Entry.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})


app.post('/api/persons', (request, response, next) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number missing'
        })
    }

    const entry = new Entry({
        name: body.name,
        number: body.number
        })

    entry.save().then(savedEntry => {
        response.json(savedEntry)
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    Entry.findById(request.params.id)
        .then(entry => {
            if (!entry) {
                return response.status(404).end()
            }

            entry.number = body.number

            return entry.save().then((updatedEntry) => {
                response.json(updatedEntry)
            })


        })
        .catch(error => next(error))
})


const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id'})
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
