import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { popNotif } from './notificationReducer'

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
      setUser(state, action) {
        const userData = action.payload
        window.localStorage.setItem("user", JSON.stringify(userData));
        blogService.setToken(userData.token);
        return userData
      },
      logoutUser(state, action) {
        window.localStorage.removeItem("user");
        return null
      }
    }
  })

  export const login = (credentials) => async dispatch => {
    try {
      const userData = await loginService.login(credentials)
      dispatch(setUser(userData))
    } catch(e) {
      dispatch(popNotif({message: 'wrong username or password',isError: true}, 5))
    }
  }
  
  
  export const { setUser, logoutUser } = userSlice.actions
  export default userSlice.reducer

