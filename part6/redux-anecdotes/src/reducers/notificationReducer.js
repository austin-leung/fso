import { createSlice } from '@reduxjs/toolkit'

const initialState = 'notif default'

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotificationR(state, action) {
            const content = action.payload
            return content
        },
        removeNotification(state, action) {
            return ''
        }
    }
})

export const { setNotificationR, removeNotification } = notificationSlice.actions

export const setNotification = (content, time) => {
    return async dispatch => {
        dispatch(setNotificationR(content))
        setTimeout(() => {
            dispatch(removeNotification())
        }, time)
    }
}

export default notificationSlice.reducer