import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import loginService from '../services/login'

const initialState = {
    user: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserR(state, action) {
            const user = action.payload
            console.log(action.payload)
            return user
        }
    }
})

export const { setUserR } = userSlice.actions

export const setUser = (user) => {
    return async dispatch => {
        blogService.setToken(user.token);
        dispatch(setUserR({user}))
    }
}

export const login = (username, password) => {
    return async dispatch => {
        const user = await loginService.login({
            username,
            password,
        });
        window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
        blogService.setToken(user.token);

        dispatch(setUserR(user))
    }
}

export const logout = () => {
    return async dispatch => {
        dispatch(setUserR(null));
    }
}

export default userSlice.reducer