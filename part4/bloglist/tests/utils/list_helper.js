const blogsRouter = require("../../controllers/blogs");
const Blog = require('../../models/blog')

const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    return blogs.reduce((accum,item) => accum + item.likes, 0)
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}
  
  module.exports = {
    dummy,
    totalLikes,
    blogsInDb
  }