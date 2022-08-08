import { useState } from 'react'

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

  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  return (
    <div>
      <li>
        <span>
          {blog.title} by {blog.author}&nbsp;

          <div style={hideWhenVisible}>
            <button onClick={toggleVisibility}>view</button>
          </div>
          <div style={showWhenVisible} data-testid='blog-detail'>
            URL: {blog.url}
            <br></br>
            Likes: {blog.likes} &nbsp;
            <button onClick={likeBlog}>
              like
            </button>
            <br></br>
            {(blog.user?.username === user?.username) &&
              (<button onClick={handleRemoveBlog}>
                remove
              </button>)
            }
            <button onClick={toggleVisibility}>hide</button>
          </div>
        </span>
      </li>
    </div>
  )}

export default Blog