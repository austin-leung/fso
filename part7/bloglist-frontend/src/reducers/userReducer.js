import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import loginService from '../services/login'
import userService from '../services/users'

const initialState = {
    user: null,
    users: []
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserR(state, action) {
            const user = action.payload
            return {
                ...state,
                user
            }
        },
        setUsers(state, action) {
            return {
                ...state,
                users: action.payload
            }
        }
    }
})

export const { setUserR, setUsers } = userSlice.actions

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

export const getAllUsers = () => {
    return async dispatch => {
        const users = await userService.getAll()
        dispatch(setUsers(users))
    }
}

export default userSlice.reducer