const express = require('express')
const app = express()
var morgan = require('morgan')

app.use(express.json())
// app.use(morgan('tiny'))

morgan.token('body', function (req, res) { return JSON.stringify(req.body) })

app.use(morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      tokens.body(req, res)
    ].join(' ')
  }))

let phonebook = [
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

app.get('/api/phonebook', (request, response) => {
    response.json(phonebook)
})

app.get('/info', (request, response) => {
    response.send(`Phonebook has info for ${phonebook.length} people<br><br>${Date()}`)
})

app.get('/api/phonebook/:id', (request, response) => {
    const id = Number(request.params.id)
    const pbEntry = phonebook.find(pb => pb.id === id)

    if (pbEntry) {
        response.json(pbEntry)
    } else {
        response.status(404).end()
    }
})


app.delete('/api/phonebook/:id', (request, response) => {
    const id = Number(request.params.id)
    phonebook = phonebook.filter(pb => pb.id !== id)
    
    response.status(204).end()
})

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }  

app.post('/api/phonebook', (request, response) => {
    const body = request.body

    if (!body.name) {
        return response.status(400).json({
            error: "name missing"
        })
    }

    if (!body.number) {
        return response.status(400).json({
            error: "number missing"
        })
    }

    const pbEntry = phonebook.find(pb => pb.name === body.name)

    if (pbEntry) {
        return response.status(400).json({
            error: "name exist"
        })
    }

    const pb = {
        id: getRandomInt(100000),
        name: body.name || "no name",
        number: body.number || "no number"
    }

    phonebook = phonebook.concat(pb)

    response.json(pb)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})