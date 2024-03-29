const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })

    response.json(blogs)
  })
  
blogsRouter.post('/', async (request, response) => {
  const { body } = request

  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    comments: body.comments,
    user: user._id
  })
  const res = await blog.save()
  user.blogs = user.blogs.concat(res._id)
  await user.save()

  response.status(201).json(res)
})

blogsRouter.post('/:id/comments', async (request, response, next) => {
  const { comment } = request.body

  const id = request.params.id
  const blog = await Blog.findById(id)
  console.log(blog)

  const commentedBlog = {
    ...blog.toJSON(),
    comments: blog.comments.concat(comment)
  }

  const updatedBlog = await Blog
    .findByIdAndUpdate(
      id, 
      commentedBlog, 
      { new: true, runValidators: true, context: 'query' }
    )

   await updatedBlog.save() 
      
  response.status(200).json(updatedBlog)
})

blogsRouter.delete('/:id', async (request, response, next) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const blog = request.body

  const updatedBlog = await Blog
    .findByIdAndUpdate(
      request.params.id, 
      blog, 
      { new: true, runValidators: true, context: 'query' }
    )
      
  response.status(200).json(updatedBlog)
})

module.exports = blogsRouter