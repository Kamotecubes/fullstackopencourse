import { useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs, createBlog, incLike, removeBlog } from "./reducers/blogReducer";
import { login, setUser, logoutUser } from './reducers/userReducer'
import { popNotif } from "./reducers/notificationReducer";
import Login from "./components/Login";


const App = () => {
  const dispatch = useDispatch()
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

  const handleLogin = async (username, password) => {

    dispatch(login({ username, password }))
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
    </>
  );
};

export default App;
