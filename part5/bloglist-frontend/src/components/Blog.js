const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
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

  const handleRemoveBlog = () => {
    deleteBlog(blog.id)
  }

  return (
    <div>
      <li>
        <span>
          {blog.title} by {blog.author}&nbsp;
          <button onClick={likeBlog}>
            like
          </button>&nbsp;
          {blog.likes} likes&nbsp;
          {(blog.user?.username === user?.username) &&
            (<button onClick={handleRemoveBlog}>
              remove
            </button>)
          }
        </span>
      </li>
    </div>
  )}

export default Blog