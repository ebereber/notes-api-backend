require('dotenv').config()
require('./mongo')
const express = require('express')
const app = express()
const cors = require('cors')

const handleErrors = require('./middleware/handleErrors')
const notFound = require('./middleware/notFound')
const usersRouter = require('./routes/users.routes')
const notesRouter = require('./routes/notes.routes')

app.use(cors())
app.use(express.json())

app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)
app.use(notFound)
app.use(handleErrors)

const PORT = process.env.PORT || 3001

const server = app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`)
})

module.exports = { app, server }
