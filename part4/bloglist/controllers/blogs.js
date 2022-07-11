const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})

    response.json(blogs)
  })
  
blogsRouter.post('/', async (request, response) => {
  const { body } = request
  console.log(body)
  const user = await User.findById(body.userId)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })
  const res = await blog.save()
  user.blogs = user.blogs.concat(res._id)
  await user.save()

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

  const res = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.status(200).json(res.toJSON())
})

module.exports = blogsRouter