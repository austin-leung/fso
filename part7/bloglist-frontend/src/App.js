import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import Menu from "./components/Menu"
import { setNotification } from './reducers/notificationReducer';
import { setUser, login, logout } from './reducers/userReducer'

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch()
  const user = useSelector(state => state.user.user)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      dispatch(login(username, password))
      setUsername("");
      setPassword("");
    } catch (exception) {
      dispatch(setNotification("Wrong credentials", 5000))
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();

    try {
      window.localStorage.removeItem("loggedBlogappUser");
      dispatch(logout())
      setUsername("");
      setPassword("");
    } catch (exception) {
      dispatch(setNotification("Something went wrong with logging out", 5000));
    }
  };


  return (
    <div>
      <Menu />

      {user === null ? (
        <Togglable buttonLabel="login">
          {user}
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
        </div>
      )}

    </div>
  );
};

export default App;
