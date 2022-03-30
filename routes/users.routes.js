const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/User')

usersRouter.post('/', async (request, response) => {
  const { body } = request
  const { username, name, password } = body

  const passwordHash = await bcrypt.hash(password, 10)
  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

usersRouter.get('/', (request, response) => {
  User.find({}).then(users => {
    response.json(users)
  })
})

module.exports = usersRouter
