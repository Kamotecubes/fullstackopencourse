import { useEffect, useState } from "react";
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
import User from "./components/User"
import userService from "./services/users"
import BlogView from "./components/BlogView"

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const handleLogout = () => dispatch(logoutUser())
  const [users, setUsers] = useState([])

  const match = useMatch('/users/:id')
  const selectedUser =  match 
  ? users.find(u => u.id === match.params.id)
  : null


  useEffect(() => {
    const userData = window.localStorage.getItem("user");
    
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      dispatch(setUser(parsedUserData))
    }
  }, []);
 

    useEffect(() => {
        const fetchUsers = async () => {
            const data = await userService.getUsers()
            setUsers(data)
            
        }
        fetchUsers()
    }, [])

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
    <div className="container">
      <div>
        <Link to="/">blogs</Link>&nbsp;
        <Link to="/users">users</Link>&nbsp;
        {user.username} logged in <button onClick={handleLogout}>logout</button>
      </div>
      <h2>blogs app</h2>
              <Notification />
              
        <Routes>
          <Route path='/' element={<BlogPage />}></Route>
          <Route path='/users' element={<Users users={users} />}></Route>
          <Route path='/users/:id' element={<User user={selectedUser} />}></Route>
          <Route path='/blogs/:id' element={<BlogView />}></Route>
        </Routes>
        
    </div>
  );
};

export default App;
