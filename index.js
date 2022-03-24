require('dotenv').config()
require('./mongo')
const express = require('express')
const app = express()
const cors = require('cors')

const Note = require('./models/Note')

const handleErrors = require('./middleware/handleErrors')
const notFound = require('./middleware/notFound')

app.use(cors())
app.use(express.json())

app.use((request, response, next) => {
  console.log(request.method)
  console.log(request.path)
  console.log(request.body)
  next()
})

app.get('/', (request, response) => {
  response.send('<h1>Este es un servidor</h2>')
})

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

app.get('/api/notes/:id', (request, response, next) => {
  const { id } = request.params
  Note.findById(id).then(note => {
    if (note) {
      response.json(note)
    } else {
      response.status(404).end()
    }
  }).catch(err => {
    next(err)
  })
})

app.put('/api/notes/:id', (request, response, next) => {
  const { id } = request.params
  const note = request.body

  const newNoteInfo = {
    content: note.content,
    important: note.important
  }

  Note.findOneAndUpdate(id, newNoteInfo, { new: true })
    .then(result => {
      response.json(result)
    })
})

app.delete('/api/notes/:id', (request, response, next) => {
  const { id } = request.params
  Note.findByIdAndRemove(id).then(result => {
    response.status(204).end()
  }).catch(error => next(error))
  response.status(204).end()
})

app.post('/api/notes', (request, response) => {
  const note = request.body
  if (!note || !note.content) {
    return response.status(400).json({ error: 'note.content.dsnt exist' })
  }

  const newNote = new Note({
    content: note.content,
    date: new Date(),
    important: note.important || false
  })
  newNote.save().then(savedNote => {
    response.json(savedNote)
  })
})

app.use(notFound)

app.use(handleErrors)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`)
})

module.exports = app
