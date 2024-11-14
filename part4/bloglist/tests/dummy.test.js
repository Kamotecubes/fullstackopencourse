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

  describe('get', () => {

      test('there are 4 blogs', async () => {
        await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body.length, 4)
      })
    
      test('unique identifier property of the blog posts is named id', async () => {
        const response = await api.get('/api/blogs')
        response.body.forEach(e => {
          assert.strictEqual(e.id, e._id)
        })
        
      })
  })
  describe('post', () => {

    test('create', async () => {
        const newBlog = {
          title: "changes",
          author: "2pac",
          url: "asdqwe",
          likes: 123
        }
        await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
        const currentBlogs = await helper.blogsInDb()
        assert.strictEqual(currentBlogs.length, helper.initialBlogs.length + 1)
        const contents = currentBlogs.map(n => n.author)
        assert(contents.includes('2pac'))
    })
  })
  describe('delete', () => {

    test('delete 1', async () => {
      await api.delete('/api/blogs/5a422b3a1b54a676234d17f9').expect(204)
  
      const currentBlogs = await helper.blogsInDb()
      assert.strictEqual(currentBlogs.length, 3)
    })

    test('fails with statuscode 400 id is invalid', async () => {
      const invalidId = 'r34f34r43er23r2'

      await api.delete(`/api/blogs/${invalidId}`).expect(400)
    })

    test('no id', async () => {
      await api.delete(`/api/blogs/`).expect(404)
    })
  })

  describe('put', () => {

    test('add like', async () => {
      const id = '5a422b3a1b54a676234d17f9'
      await api.put(`/api/blogs/addLike/${id}`).expect(200)
  
      const updatedBlog = await helper.getBlog(id)
      assert.strictEqual(updatedBlog.likes, 13)
    })

    test('fails with statuscode 400 id is invalid', async () => {
      const invalidId = 'r34f34r43er23r2'

      await api.put(`/api/blogs/addLike/${invalidId}`).expect(400)
    })

    test('no id', async () => {
      await api.put(`/api/blogs/addLike/`).expect(404)
    })
  })

})

after(async () => {
  await mongoose.connection.close()
})