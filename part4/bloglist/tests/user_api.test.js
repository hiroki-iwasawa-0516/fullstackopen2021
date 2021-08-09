const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')

const User = require('../models/user')
const helper = require('./test_helper')

const app = require('../app')
const api = supertest(app)

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('all users are returned', async() => {
    const response = await api.get('/api/users')
      .expect(200).expect('Content-Type', /application\/json/)
    expect(response.body).toHaveLength(1)
  })

  afterAll(() => {
    mongoose.connection.close()
  })

})
