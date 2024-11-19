import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  const [title, setTitle] = useState('') 
  const [author, setAuthor] = useState('') 
  const [url, setUrl] = useState('') 


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
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

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    try {
      const newblog = await blogService.saveBlog({title, author, url})
      setBlogs(blogs.concat(newblog))
      setTitle('')
      setAuthor('')
      setUrl('')
      setMessage({message: `a new blog ${newblog.title} by ${newblog.author} added`, isError: false})
      setTimeout(() => {
        setMessage(null)
      }, 3000)

    } catch (exception) {
      
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
          <h1>create new</h1>
          <form onSubmit={handleCreateBlog}>
           <div>title:<input type="text" value={title} onChange={({target}) => setTitle(target.value)} /></div> 
           <div>author:<input type="text" value={author} onChange={({target}) => setAuthor(target.value)} /></div> 
           <div>url:<input type="text" value={url} onChange={({target}) => setUrl(target.value)} /></div> 
           <button type="submit">create</button>
          </form>
        </div>
        
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
    </>
  )
}

export default App