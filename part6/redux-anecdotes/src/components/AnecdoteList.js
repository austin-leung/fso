import { useSelector, useDispatch } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'


const AnecdoteList = (props) => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes)

    const vote = (anecdote) => {
        console.log('vote', anecdote.id)
        dispatch(voteForAnecdote(anecdote))
        dispatch({ type: 'notification/setNotification', payload: `you voted '${anecdote.content}'` })
        setTimeout(() => {
            dispatch({ type: 'notification/removeNotification' })
        }, 5000)
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