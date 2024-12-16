import { useEffect } from "react";
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import Blog from "./Blog";
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs, createBlog, incLike, removeBlog } from "../reducers/blogReducer";

import { popNotif } from "../reducers/notificationReducer";

const BlogPage = () => {
    const dispatch = useDispatch()
    const blogs = useSelector(state => [...state.blogs].sort((a, b) => b.likes - a.likes))

    const user = useSelector(state => state.user)

    useEffect(() => {
        dispatch(initializeBlogs())
      }, []);

    const handlecreateBlog = async (blogInfo) => {
        try {
          dispatch(createBlog(blogInfo))
          dispatch(popNotif({message: `a new blog ${blogInfo.title} by ${blogInfo.author} added`,isError: false}, 5))
        } catch (exception) {
          dispatch(popNotif({message: `error`,isError: true}, 5))
        }
      };
    
    const addLike = async (id) => dispatch(incLike(id))
    
      const deleteBlog = async (blog) => {
        if (confirm(`Remove blog ${blog.title} by ${blog.user.name}`)) {
          dispatch(removeBlog(blog.id))
        }
      };

    return (
        <>
            
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
}

export default BlogPage