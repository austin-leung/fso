import { useSelector, useDispatch } from "react-redux";
import { useRef, useEffect } from 'react'
import Blog from "./Blog";
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import { createBlog, initializeBlogs } from "../reducers/blogReducer"

const BlogList = () => {
const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch]);

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    dispatch(createBlog(blogObject))
  };

  const blogFormRef = useRef();

  return (
    <>
        <h2>blogs</h2>
      <ul>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} user={user} />
        ))}
      </ul>
      <h2>create new</h2>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
    </>
  );
};

export default BlogList;
