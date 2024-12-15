import { useState, useEffect, useReducer } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import NotificationContext from "./NotificationContext";
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs, createBlog, incLike, removeBlog } from "./reducers/blogReducer";
import { login, setUser, logoutUser } from './reducers/userReducer'
import { popNotif } from "./reducers/notificationReducer";

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
      dispatch(popNotif({message: `a new blog ${blogInfo.title} by ${blogInfo.author} added`,isError: false}, 5))
    } catch (exception) {
      dispatch(popNotif({message: `error`,isError: true}, 5))
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    dispatch(login({ username, password }))
    setUsername("");
    setPassword("");
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
