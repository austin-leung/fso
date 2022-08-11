import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import BlogList from "./BlogList";
import UserList from "./UserList";
import Notification from "./Notification";
import { useSelector } from 'react-redux';


const Menu = () => {
const notification = useSelector(state => state.notification.content)

  const padding = {
    paddingRight: 5,
  };
  return (
    <Router>
      <div>
        <Link style={padding} to="/">
          blogs
        </Link>
        {/* <Link style={padding} to="/create">create new</Link> */}
        <Link style={padding} to="/users">
          users
        </Link>
      </div>
      <Notification content={notification} />
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/users" element={<UserList />} />
      </Routes>
    </Router>
  );
};

export default Menu;
