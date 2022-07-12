import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({createBlog}) => {
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
        setInputValue({title: '', author: '', url: ''})
    }

    return (
        <form onSubmit={handleCreateBlog}>
            <div>
                title:&nbsp;
                <input
                    type="text"
                    value={inputValue?.title}
                    name="title"
                    onChange={({ target }) => handleInputChange(target)}
                />
            </div>
            <div>
                author:&nbsp;
                <input
                    type="text"
                    value={inputValue?.author}
                    name="author"
                    onChange={({ target }) => handleInputChange(target)}
                />
            </div>
            <div>
                url:&nbsp;
                <input
                    type="text"
                    value={inputValue?.url}
                    name="url"
                    onChange={({ target }) => handleInputChange(target)}
                />
            </div>
            <br></br>
            <button type="submit">save</button>
        </form>
    )
}

BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired,
}

export default BlogForm