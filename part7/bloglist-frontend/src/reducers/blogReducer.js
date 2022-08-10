import { createSlice, getDefaultMiddleware } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        appendBlog(state, action) {
            state.push(action.payload)
        },
        setBlogs(state, action) {
            return action.payload
        }
    }
})

export const { appendBlog, setBlogs } = blogSlice.actions

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll();
        dispatch(setBlogs(blogs.slice().sort((a, b) => (b.likes || 0) - (a.likes || 0))));
    }
}

export const createBlog = newObject => {
    return async dispatch => {
        const newBlog = await blogService.create(newObject)
        dispatch(appendBlog(newBlog))
    }
}

export default blogSlice.reducer