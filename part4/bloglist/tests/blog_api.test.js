const mongoose = require('mongoose')
const supertest = require('supertest')

const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)

  const userObjects = helper.initUsers.map(user => new User(user))
  const userPromises = userObjects.map(user => user.save())
  await Promise.all(userPromises)
})

test('all notes are returned', async () => {
  const response = await api.get('/api/blogs')
    .expect(200).expect('Content-Type', /application\/json/)
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('a valid blog can be added', async () => {
  await api
    .post('/api/blogs')
    .send(helper.newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  expect(response.body).toContainEqual({
    ...helper.newBlog,
    id: expect.any(String),
    user: { id: expect.any(String), name: expect.any(String), username: expect.any(String) }
  })
})

test('a blog can be deleted', async () => {
  const blogsAtStart  = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(
    helper.initialBlogs.length - 1
  )
  expect(blogsAtEnd).not.toContainEqual(blogToDelete)
})

test('a blog can be updated', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogsToUpdate = blogsAtStart[0]

  await api.put(`/api/blogs/${blogsToUpdate.id}`).send(helper.newBlog)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd[0]).toEqual({ ...helper.newBlog, id:blogsToUpdate.id })
})

afterAll(() => {
  mongoose.connection.close()
})
