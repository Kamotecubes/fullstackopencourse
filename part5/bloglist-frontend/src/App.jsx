import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)


  useEffect(() => {
    blogService.getAll().then(initialBlogs =>{
      const b = initialBlogs.sort((a,b) => (b.likes - a.likes))
      setBlogs( b )
    }
      
    )  
  }, [])
  
  useEffect(() => {
    const userData = window.localStorage.getItem('user')
    if (userData) {
      const parsedUserData = JSON.parse(userData)
      setUser(parsedUserData)
      blogService.setToken(parsedUserData.token)
    } 
  }, [])


  const createBlog = async (blogInfo) => {
    try {
      const newblog = await blogService.saveBlog(blogInfo)
      setBlogs(blogs.concat(newblog))
      setMessage({message: `a new blog ${newblog.title} by ${newblog.author} added`, isError: false})
      setTimeout(() => {
        setMessage(null)
      }, 3000)

    } catch (exception) {
      
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'user', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage({message: `wrong username or password`, isError: true})
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('user')
    setUser(null)
  }

  const addLike = async (id) => {
    const newBlog = await blogService.addLike(id)
    setBlogs(blogs.map(b => b.id === newBlog.id ? newBlog : b))
  }

  const deleteBlog = async (blog) => {
    if (confirm(`Remove blog ${blog.title} by ${blog.user.name}`)) {
      const status = await blogService.deleteBlog(blog.id)
      if (status === 204) {
        setBlogs(blogs.filter(b => id !== b.id))
      }
    }
    
  }

  if (user === null) {
    return (
      <>
      <h2>login to application</h2>
      <Notification message={message?.message} isError={message?.isError}/>
      <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>  
      </>
    )
  }

  return (
    <>
        <h2>blogs</h2>
        <Notification message={message?.message} isError={message?.isError}/>
        <p>{user.username} logged in <button onClick={handleLogout}>logout</button></p>
        <div>
          <Togglable buttonLabel="new blog">
            <BlogForm createBlog={createBlog}/>
          </Togglable>
          
        </div>
        
        {blogs.map(blog => <Blog key={blog.id} blog={blog} addLike={addLike} deleteBlog={deleteBlog} showDelete={blog.user.username === user.username}/>
        )}
    </>
  )
}

export default App