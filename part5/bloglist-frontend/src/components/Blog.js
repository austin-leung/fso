const Blog = ({blog, updateBlog}) => {
  const likeBlog = () => {
    const { title, author, url, likes } = blog

    const newBlogObject = {
      title,
      author,
      url,
      user: blog.user?.id || blog.user,
      likes: likes + 1
    }

    updateBlog(blog.id, newBlogObject)
  }

  return (
    <div>
      <li>
        <span>
          {blog.title} by {blog.author}&nbsp;
          <button onClick={likeBlog}>
            Like
          </button>&nbsp;
          {blog.likes} likes
        </span>
      </li>
    </div>  
)}

export default Blog