import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [inputValue, setInputValue] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    try {
      window.localStorage.removeItem('loggedBlogappUser')
      setUser(null)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Something went wrong with logging out')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleInputChange = (event) => {
    const target = event.target
    const value = target.value
    const name = target.name

    setInputValue((prevValues) => {
      return {
        ...prevValues,
        [name]: value,
      }
    })
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const logoutForm = () => (
    <form onSubmit={handleLogout}>
      <button type="submit">logout</button>
    </form>      
  )

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: inputValue?.title,
      author: inputValue?.author,
      url: inputValue?.url,
      likes: 0,
      id: blogs.length + 1,
    }

    blogService.create(blogObject)
    setInputValue({title: '', author: '', url: ''})
  }


  const blogForm = () => (
    <></>
    // <form onSubmit={addBlog}>
    //   <input
    //     value={newBlog}
    //     onChange={handleBlogChange}
    //   />
    //   <button type="submit">save</button>
    // </form>  
  )

  return (
    <div>
      <Notification message={errorMessage} />

      {user === null ?
        loginForm() :
        <div>
          <div><p>{user.name} logged-in</p>{logoutForm()}</div>
          {blogForm()}
        </div>
      }

      <h2>blogs</h2>
      <ul>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </ul>
    </div>
  )
}

export default App
