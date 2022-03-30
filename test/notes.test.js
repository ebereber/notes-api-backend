const moongose = require('mongoose')
const supertest = require('supertest')
const { app, server } = require('../index')

const api = supertest(app)

test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-type', /application\/json/)
})

afterAll(() => {
  moongose.connection.close()
  server.close()
})
