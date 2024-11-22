import { useState } from 'react'
const BlogForm = ({createBlog}) => {

    const [title, setTitle] = useState('') 
    const [author, setAuthor] = useState('') 
    const [url, setUrl] = useState('') 

    const handleCreateBlog = async (event) => {
        event.preventDefault()
        createBlog({title, author, url})
        setTitle('')
        setAuthor('')
        setUrl('')
    }
    return (
        <>
            <h1>create new</h1>
            <form onSubmit={handleCreateBlog}>
              <div>title:<input data-testid='blogform-title' type="text" placeholder='title' value={title} onChange={({target}) => setTitle(target.value)} /></div> 
              <div>author:<input data-testid='blogform-author' type="text" placeholder='author' value={author} onChange={({target}) => setAuthor(target.value)} /></div> 
              <div>url:<input data-testid='blogform-url' type="text" placeholder='url' value={url} onChange={({target}) => setUrl(target.value)} /></div> 
              <button type="submit">create</button>
            </form>
        </>
    )
}

export default BlogForm