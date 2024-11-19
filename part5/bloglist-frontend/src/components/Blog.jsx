import { useState } from 'react'
const Blog = ({ blog, addLike }) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} <button onClick={() => setVisible(!visible)}>{visible ? 'hide' : 'view'}</button>
      </div>
      <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button onClick={() => addLike(blog.id)}>like</button></div>
        <div>{blog?.user?.name}</div>
      </div>
    </div>
  )
}

export default Blog