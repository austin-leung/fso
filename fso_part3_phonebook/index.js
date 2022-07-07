const express = require('express')
const app = express()
var morgan = require('morgan')
require('dotenv').config()


const cors = require('cors')
const PhonebookEntry = require('./models/persons')

app.use(cors())

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
  }
app.use(express.static('build'))
app.use(express.json())
app.use(requestLogger)

morgan.token('body', function (req, res) { if (req.method === 'POST') return JSON.stringify(req.body)
return null })

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


app.get('/api/phonebook', (request, response) => {
    PhonebookEntry.find({}).then(pb => {
        response.json(pb)
    })
})
app.get('/info', (request, response) => {
    response.send(`Phonebook has info for ${phonebook.length} people<br><br>${Date()}`)
})

app.get('/api/phonebook/:id', (request, response, next) => {
    PhonebookEntry.findById(request.params.id).then(pbEntry => {
        if (pbEntry) {
            response.json(pbEntry.toJSON())
        } else {
            response.status(404).end()
        }
    }).catch(error => next(error))
})


app.delete('/api/phonebook/:id', (request, response) => {
    const id = request.params.id
    PhonebookEntry.findByIdAndRemove(id)
        .then(() => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }  

app.post('/api/phonebook', (request, response, next) => {
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

    // const pbEntry = phonebook.find(pb => pb.name === body.name)

    // if (pbEntry) {
    //     return response.status(400).json({
    //         error: "name exist"
    //     })
    // }

    const pb = new PhonebookEntry({
        id: getRandomInt(100000),
        name: body.name || "no name",
        number: body.number || "no number"
    })

    pb.save().then(savedPb => {
        response.json(savedPb.toJSON())
    })
    .catch(error => next(error))
})

app.put('/api/phonebook/:id', (request, response, next) => {
    const body = request.body
    const pb = {
        name: body.name || "no name",
        number: body.number || "no number"
    }
  
    Note.findByIdAndUpdate(request.params.id, pb, { new: true, runValidators: true, context: 'query' })
      .then(updatedPb => {
        response.json(updatedPb)
      })
      .catch(error => next(error))
  })

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }
  
    next(error)
  }
  
  // this has to be the last loaded middleware.
  app.use(errorHandler)