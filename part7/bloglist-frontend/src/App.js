import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { initializeBlogs, createBlog } from './reducers/blogReducer';
import { setNotification } from './reducers/notificationReducer';

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const notification = useSelector(state => state.notification.content)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log("bad login")
      dispatch(setNotification("Wrong credentials", 5000))
      console.log(notification)
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();

    try {
      window.localStorage.removeItem("loggedBlogappUser");
      setUser(null);
      setUsername("");
      setPassword("");
    } catch (exception) {
      dispatch(setNotification("Something went wrong with logging out", 5000));
    }
  };

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    dispatch(createBlog(blogObject))
  };

  const updateBlog = async (id, newBlogObject) => {
    await blogService.update(id, newBlogObject);
    const newBlogs = await blogService.getAll();

    // setBlogsSorted(newBlogs);
  };

  const removeBlog = async (id) => {
    const blog = blogs.filter((blog) => blog.id === id)[0];

    if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
      await blogService.deleteBlog(id);
      const newBlogs = await blogService.getAll();

      // setBlogsSorted(newBlogs);
    }
  };

  const blogFormRef = useRef();

  return (
    <div>
      <Notification message={notification} />
      <h2>blogs</h2>

      <ul>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateBlog={updateBlog}
            deleteBlog={removeBlog}
            user={user}
          />
        ))}
      </ul>

      <h2>create new</h2>

      {user === null ? (
        <Togglable buttonLabel="login">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      ) : (
        <div>
          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
        </div>
      )}
    </div>
  );
};

export default App;
