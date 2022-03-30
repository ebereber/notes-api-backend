const notesRouter = require('express').Router()
const Note = require('../models/Note')

notesRouter.get('/', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

notesRouter.get('/:id', (request, response, next) => {
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

notesRouter.put('/:id', (request, response, next) => {
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

notesRouter.delete('/:id', (request, response, next) => {
  const { id } = request.params
  Note.findByIdAndRemove(id).then(result => {
    response.status(204).end()
  }).catch(error => next(error))
  response.status(204).end()
})

notesRouter.post('/', (request, response) => {
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

module.exports = notesRouter
