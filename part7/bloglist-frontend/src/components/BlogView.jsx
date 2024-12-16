import { useDispatch, useSelector } from 'react-redux'
import { useState } from "react";
import { incLike, addComment } from "../reducers/blogReducer";
import {useParams} from 'react-router-dom'
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
            <p>{blog.likes} likes <button onClick={addLike}>like</button></p>
            <p>added by {blog.user.name}</p>
            <h3>comments</h3>
            <div>
                <input type="text" value={comment} onChange={(event) => setComment(event.target.value)} />
                <button onClick={handleAddComment}>add comment</button>
            </div>
            <ul>
                {blog.comments.map(c => <li key={c._id}>{c.body}</li>)}
            </ul>
        </>
    )
    
}

export default BlogView