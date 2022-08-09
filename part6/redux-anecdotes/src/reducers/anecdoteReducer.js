import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
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
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { makeVote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes.slice().sort((a,b) => b.votes - a.votes)))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    console.log(newAnecdote)
    dispatch(appendAnecdote(newAnecdote.data))
  }
}

export const voteForAnecdote = anecdote => {
  return async dispatch => {
    const newObject = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    const newAnecdote = await anecdoteService.update(newObject)
    dispatch(makeVote(newAnecdote.data.id))
  }
}

export default anecdoteSlice.reducer