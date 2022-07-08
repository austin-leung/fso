const blogsRouter = require("../../controllers/blogs");

const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    return blogs.reduce((accum,item) => accum + item.likes, 0)
}
  
  module.exports = {
    dummy,
    totalLikes
  }