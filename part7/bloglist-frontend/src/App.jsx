import { useState, useEffect, useReducer } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import NotificationContext from "./NotificationContext";
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs, createBlog, incLike, removeBlog } from "./reducers/blogReducer";
import { login, setUser, logoutUser } from './reducers/userReducer'

const notifReducer = (state, action) => {
  switch (action.type) {
    case 'DISPLAY':
      return action.payload
    case 'RESET':
      return ''
    default:
      return ''
  }
}

const App = () => {
  const dispatch = useDispatch()
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const  [notif, notifDispatch] = useReducer(notifReducer, '')
  const blogs = useSelector(state => [...state.blogs].sort((a, b) => b.likes - a.likes))
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, []);

  useEffect(() => {
    const userData = window.localStorage.getItem("user");
    
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      dispatch(setUser(parsedUserData))
    }
  }, []);

  const handlecreateBlog = async (blogInfo) => {
    try {
      dispatch(createBlog(blogInfo))
      // notifDispatch({type: 'DISPLAY', payload: {message: `a new blog ${newblog.title} by ${newblog.author} added`,isError: false}})
      // setTimeout(() => notifDispatch({type: 'RESET'}), 5000)
    } catch (exception) {
      notifDispatch({type: 'DISPLAY', payload: {message: `error`,isError: true}})
      setTimeout(() => notifDispatch({type: 'RESET'}), 5000)
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      dispatch(login({ username, password }))
      setUsername("");
      setPassword("");
    } catch (exception) {
      notifDispatch({type: 'DISPLAY', payload: {message: 'wrong username or password',isError: true}})
      setTimeout(() => notifDispatch({type: 'RESET'}), 5000)
    }
  };

  const handleLogout = () => dispatch(logoutUser())


  const addLike = async (id) => dispatch(incLike(id))

  const deleteBlog = async (blog) => {
    if (confirm(`Remove blog ${blog.title} by ${blog.user.name}`)) {
      dispatch(removeBlog(blog.id))
    }
  };

  if (user === null) {
    return (
      <>
        <NotificationContext.Provider value={[notif, notifDispatch]}>
          <h2>login to application</h2>
          <Notification />
          <form onSubmit={handleLogin}>
            <div>
              username
              <input
                data-testid="username"
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
              password
              <input
                data-testid="password"
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <button type="submit">login</button>
          </form>
        </NotificationContext.Provider>
        
      </>
    );
  }

  return (
    <>
      <NotificationContext.Provider value={[notif, notifDispatch]}>
        <h2>blogs</h2>
        <Notification />
        <p>
          {user.username} logged in <button onClick={handleLogout}>logout</button>
        </p>
        <div>
          <Togglable buttonLabel="new blog">
            <BlogForm createBlog={handlecreateBlog} />
          </Togglable>
        </div>

        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            addLike={addLike}
            deleteBlog={deleteBlog}
            showDelete={blog.user.username === user.username}
          />
        ))}
      </NotificationContext.Provider>
      
    </>
  );
};

export default App;
