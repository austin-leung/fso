import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      const newAnecdote = action.payload.data
      state.push(newAnecdote)
    },
    makeVote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      const newState = state.map(a => a.id !== id ? a : changedAnecdote)
      newState.sort((a,b) => b.votes - a.votes)
      return newState
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { createAnecdote, makeVote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer