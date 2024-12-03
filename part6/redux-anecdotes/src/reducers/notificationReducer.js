import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    notificationChange(state, action) {
      return action.payload
    },
    removeNotif() {
        return ''
    }
  }
})
  export const { notificationChange, removeNotif } = notificationSlice.actions
  export default notificationSlice.reducer