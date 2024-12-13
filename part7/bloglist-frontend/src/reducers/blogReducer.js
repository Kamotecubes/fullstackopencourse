import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
      setBlogs(state, action) {
        return action.payload
      },
      appendBlog(state, action) {
        state.push(action.payload)
      },
      addLike(state, action) {
        const blog = action.payload
        return state.map(s => s.id === blog.id ? blog : s)
      },
      deleteBlog(state, action) {
        const id = action.payload
        return state.filter(s => s.id !== id)
      }
    }
  })

  export const initializeBlogs = () => async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
  
  export const { setBlogs, appendBlog, addLike, deleteBlog } = blogSlice.actions
  export default blogSlice.reducer

