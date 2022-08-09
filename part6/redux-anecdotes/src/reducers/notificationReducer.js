import { createSlice } from '@reduxjs/toolkit'

const initialState = 'notif default'

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification(state, action) {
            const content = action.payload
            return content
        },
        removeNotification(state, action) {
            return ''
        }
    }
})

export const { setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer