import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const sortedBlogs = (blogs) => {
    return blogs.slice().sort((a, b) => (b.likes || 0) - (a.likes || 0))
}

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        appendBlog(state, action) {
            state.push(action.payload)
        },
        setBlogs(state, action) {
            return action.payload
        },
        likeBlog(state, action) {
            const id = action.payload
            const blogToChange = state.find(b => b.id === id)
            const changedBlog = {
                ...blogToChange,
                likes: (blogToChange.likes || 0) + 1
            }
            const newState = state.map(b => b.id !== id ? b : changedBlog)
            return sortedBlogs(newState)
        },
        removeBlogR(state, action) {
            const id = action.payload
            return state.filter(b => b.id !== id)
        },
        commentBlog(state, action) {
            const id = action.payload.id
            const comment = action.payload.comment
            const blogToChange = state.find(b => b.id === id)
            const changedBlog = {
                ...blogToChange,
                comments: blogToChange.comments.concat(comment)
            }
            const newState = state.map(b => b.id !== id ? b : changedBlog)
            return sortedBlogs(newState)
        }
    }
})

export const { appendBlog, setBlogs, likeBlog, removeBlogR, commentBlog } = blogSlice.actions

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll();
        dispatch(setBlogs(sortedBlogs(blogs)));
    }
}

export const createBlog = newObject => {
    return async dispatch => {
        const newBlog = await blogService.create(newObject)
        dispatch(appendBlog(newBlog))
    }
}

export const updateBlog = blog => {
    return async dispatch => {
        const updatedObject = {
            ...blog,
            user: blog.user?.id || blog.user,
            likes: (blog.likes || 0) + 1
        }
        const updatedBlog = await blogService.update(blog.id, updatedObject)
        dispatch(likeBlog(updatedBlog.id))
    }
}

export const removeBlog = id => {
    return async dispatch => {
        await blogService.deleteBlog(id)
        dispatch(removeBlogR(id))
    }
}

export const addComment = (id, comment) => {
    return async dispatch => {
        await blogService.comment(id, comment)
        dispatch(commentBlog({ id, comment }))
    }
}

export default blogSlice.reducer