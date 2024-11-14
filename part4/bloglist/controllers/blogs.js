const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    const result = await blog.save()
    response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/addLike/:id', async (request, response) => {
  const result = await Blog.findByIdAndUpdate(request.params.id, { $inc: { likes: 1 } }, { new: true })
  if (result) {
    response.status(200).json(result)
  } else {
    response.status(404).end()
  }
  
})

module.exports = blogsRouter