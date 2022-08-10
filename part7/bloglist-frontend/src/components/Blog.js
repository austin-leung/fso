import { useState } from "react";
import { useDispatch } from 'react-redux';
import { updateBlog, removeBlog } from '../reducers/blogReducer'

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()

  const likeBlog = () => {
    dispatch(updateBlog(blog))
  };

  const handleRemoveBlog = () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
      dispatch(removeBlog(blog.id));
    }
  };

  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  return (
    <div className="blog">
      <li>
        <span>
          {blog.title} by {blog.author}&nbsp;
          <div style={hideWhenVisible}>
            <button onClick={toggleVisibility}>view</button>
          </div>
          <div style={showWhenVisible} data-testid="blog-detail">
            URL: {blog.url}
            <br></br>
            Likes: {blog.likes || 0} &nbsp;
            <button onClick={likeBlog}>like</button>
            <br></br>
            {blog.user?.username === user?.username && (
              <button onClick={handleRemoveBlog}>remove</button>
            )}
            <button onClick={toggleVisibility}>hide</button>
          </div>
        </span>
      </li>
    </div>
  );
};

export default Blog;
