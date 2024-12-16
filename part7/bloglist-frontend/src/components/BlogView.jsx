import { useDispatch, useSelector } from 'react-redux'
import { incLike } from "../reducers/blogReducer";
import {useParams} from 'react-router-dom'
const BlogView = () => {
    const dispatch = useDispatch()
    const params = useParams();
    const blog = useSelector(state => state.blogs.find(b => b.id === params.id)) 

    const addLike = async () => dispatch(incLike(blog.id))

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
            <ul>
                {blog.comments.map(c => <li key={c.id}>{c.body}</li>)}
            </ul>
        </>
    )
    
}

export default BlogView