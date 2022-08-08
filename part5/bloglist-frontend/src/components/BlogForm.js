import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [inputValue, setInputValue] = useState(null)

  const handleInputChange = (target) => {
    const value = target.value
    const name = target.name

    setInputValue((prevValues) => {
      return {
        ...prevValues,
        [name]: value,
      }
    })
  }

  const handleCreateBlog = (event) => {
    event.preventDefault()

    const blogObject = {
      title: inputValue?.title,
      author: inputValue?.author,
      url: inputValue?.url,
      likes: 0,
    }

    createBlog(blogObject)
    setInputValue({ title: '', author: '', url: '' })
  }

  return (
    <form onSubmit={handleCreateBlog}>
      <div>
        <label htmlFor="title">title</label>
        <input
          type="text"
          value={inputValue?.title}
          name="title"
          id="title"
          onChange={({ target }) => handleInputChange(target)}
        />
      </div>
      <div>
        <label htmlFor="author">author</label>
        <input
          type="text"
          value={inputValue?.author}
          name="author"
          id="author"
          onChange={({ target }) => handleInputChange(target)}
        />
      </div>
      <div>
        <label htmlFor="url">url</label>
        <input
          type="text"
          value={inputValue?.url}
          name="url"
          id="url"
          onChange={({ target }) => handleInputChange(target)}
        />
      </div>
      <br></br>
      <button type="submit" id='submit-button'>save</button>
    </form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm