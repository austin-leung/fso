import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    content: '',
    timeoutId: -1
}

const notificationSlice = createSlice({
    name: 'notifcation',
    initialState,
    reducers: {
        setNotificationR(state, action) {
            clearTimeout(state.timeoutId)
            return action.payload
        },
        removeNotification(state, action) {
            return initialState
        }
    }
})

export const {setNotificationR, removeNotification} = notificationSlice.actions

export const setNotification = (content, time) => {
    return async dispatch => {
        const timeoutId = setTimeout(() => {
            dispatch(removeNotification())
        }, time)
        dispatch(setNotificationR({
            content,
            timeoutId
        }))
    }
}

export default notificationSlice.reducer