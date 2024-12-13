import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'

const userSlice = createSlice({
    name: 'user',
    initialState: {},
    reducers: {
      setUser(state, action) {
        const userData = action.payload
        window.localStorage.setItem("user", JSON.stringify(userData));
        blogService.setToken(userData.token);
        return userData
      }
    }
  })

  export const login = (credentials) => async dispatch => {
    const userData = await loginService.login(credentials)
    dispatch(setUser(userData))
  }
  
  
  export const { setUser } = userSlice.actions
  export default userSlice.reducer

