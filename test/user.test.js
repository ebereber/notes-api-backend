const bcrypt = require('bcrypt')
const User = require('../models/User')

describe('creaton a new user ', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('password', 10)
    const user = new User({ username: 'Memelo', passwordHash })

    await user.save()
  })
  test('works as expected creating a fresh username')
})
