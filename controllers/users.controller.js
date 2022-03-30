const usersCtrl = {}
const User = require('../models/User')

usersCtrl.createUser = async (request, response) => {
  const { body } = request
  const { username, name, password } = body

  const user = new User({
    username,
    name,
    passwordHas: password
  })

  const savedUser = await user.save()

  response.json(savedUser)
}

module.exports = usersCtrl
