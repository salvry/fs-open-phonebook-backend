const express = require('express')
const app = express()
const morgan = require("morgan")
const cors = require('cors')


app.use(express.json());
app.use(cors());
app.use(express.static('dist'))

morgan.token('content', function getContent(req) {
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))

let contacts = [{
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  }]
      
  app.get('/api/persons', (request, response) => {
    response.json(contacts);
  })

  app.get('/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${contacts.length} people <br></br> ${new Date()}</p>`)
    
  })

  app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    const person = contacts.find(person => person.id === Number(id));
    if (person) {
        response.json(person)
      } else {
        response.status(404).send("Person not found")
      }
    })
    
    app.delete('/api/persons/:id', (request, response) => {
        const id = request.params.id
        contacts = contacts.filter(person => person.id !== Number(id))
        response.status(204).end()
      })

      const generateId = () => {
        return Math.floor(Math.random()*100)
      }
      
      app.post('/api/persons', (request, response) => {
        const body = request.body;
        
        if (!body.name) {
            return response.status(400).json({ 
              error: 'name missing' 
            });
          }
        else if (!body.number) {
            return response.status(400).json({ 
              error: 'number missing' 
            });
          }
        else if(contacts.find(c => c.name === body.name)){
            return response.status(400).json({ 
                error: 'name must be unique' 
              });
        }
        else if(contacts.find(c => c.number === body.number)){
            return response.status(400).json({ 
                error: 'number must be unique' 
              });
        }
        
        const person = {
            name: body.name,
            number: body.number,
            id: generateId(),
          }
        
          contacts = contacts.concat(person)
        
          response.json(person)
        
        })  

        const PORT = process.env.PORT || 3001
        app.listen(PORT, () => {
          console.log(`Server running on port ${PORT}`)
        })