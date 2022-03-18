const express = require('express')
const app = express()

app.use(express.json())

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

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})