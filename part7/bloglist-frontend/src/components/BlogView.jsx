import { useDispatch, useSelector } from 'react-redux'
import { useState } from "react";
import { incLike, addComment } from "../reducers/blogReducer";
import {useParams} from 'react-router-dom'
import { Button } from 'react-bootstrap'
const BlogView = () => {
    const [comment, setComment] = useState('')
    const dispatch = useDispatch()
    const params = useParams();
    const blog = useSelector(state => state.blogs.find(b => b.id === params.id)) 

    const addLike = async () => dispatch(incLike(blog.id))
    const handleAddComment = async () => dispatch(addComment(comment, blog.id))

    if (!blog) {
        return null
      }

    
    return (
        <>
            <h2>{blog.title}</h2>
            <p>{blog.url}</p>
            <p>{blog.likes} likes <Button onClick={addLike}>like</Button></p>
            <p>added by {blog.user.name}</p>
            <h3>comments</h3>
            <div>
                <input type="text" value={comment} onChange={(event) => setComment(event.target.value)} />
                <Button onClick={handleAddComment}>add comment</Button>
            </div>
            <ul>
                {blog.comments.map(c => <li key={c._id}>{c.body}</li>)}
            </ul>
        </>
    )
    
}

export default BlogView