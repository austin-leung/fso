const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})

    response.json(blogs)
  })
  
blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  const res = await blog.save()

  response.status(201).json(res)
})

blogsRouter.delete('/:id', async (request, response, next) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = {
    likes: body.likes
  }
  // console.log(blog)

  const res = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.status(200).json(res.toJSON())
})

module.exports = blogsRouter