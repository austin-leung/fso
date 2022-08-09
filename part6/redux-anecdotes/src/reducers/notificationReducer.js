import { createSlice } from '@reduxjs/toolkit'

const initialState = 'notif'

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification(state, action) {
            const content = action.payload
            return content
        }
    }
})

export const { setNotification } = notificationSlice.actions
export default notificationSlice.reducer