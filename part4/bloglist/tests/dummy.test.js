const { test, describe, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const supertest = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const helper = require('./helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async() => {
  await Blog.deleteMany({})
  const blogObjects = helper.initialBlogs.map(b => new Blog(b))
  const promiseArray = blogObjects.map(b => b.save())
  await Promise.all(promiseArray)
})

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
    const blogs = helper.initialBlogs
    test('of empty list is zero', () => {
        const result = listHelper.totalLikes([])
        assert.strictEqual(result, 0)
    })
    test('when list has only one blog equals the likes of that', () => {
        const blog = [{
            _id: "5a422a851b54a676234d17f7",
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7,
            __v: 0
          },]
        const result = listHelper.totalLikes(blog)
        assert.strictEqual(result, 7)
    })
    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(blogs)
        assert.strictEqual(result, 24)
    })
})

describe('blogs', () => {

  test('there are 4 blogs', async () => {
    await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, 4)
  })

  test('post', async () => {

  })

})

after(async () => {
  await mongoose.connection.close()
})