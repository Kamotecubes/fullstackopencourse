import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { login, setUser } from './reducers/userReducer'
import Login from "./components/Login";
import BlogPage from "./components/BlogPage"
import {
  Routes, Route, Link, useMatch, useNavigate
} from 'react-router-dom'
import {  logoutUser } from './reducers/userReducer'
import Notification from "./components/Notification";
import Users from "./components/Users"

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const handleLogout = () => dispatch(logoutUser())


  useEffect(() => {
    const userData = window.localStorage.getItem("user");
    
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      dispatch(setUser(parsedUserData))
    }
  }, []);

  const handleLogin = async (username, password) => {

    dispatch(login({ username, password }))
  };

  if (user === null) {
    return (
      <>
            <Login handleLogin={handleLogin} />
      </>
    );
  }

  return (
    <>
    <h2>blogs</h2>
            <Notification />
            <p>
              {user.username} logged in <button onClick={handleLogout}>logout</button>
            </p>
      <Routes>
        <Route path='/' element={<BlogPage />}></Route>
        <Route path='/users' element={<Users />}></Route>
      </Routes>
        
    </>
  );
};

export default App;
