import { useSelector, useDispatch } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const AnecdoteList = (props) => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes)

    const vote = (anecdote) => {
        console.log('vote', anecdote.id)
        dispatch(voteForAnecdote(anecdote))
        dispatch(setNotification(`you voted '${anecdote.content}'`, 5000))
    }

    return (
        <>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                    {anecdote.content}
                    </div>
                    <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default AnecdoteList