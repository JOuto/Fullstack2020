import React from 'react'
import { addVote } from "../reducers/anecdoteReducer"
import { setNotif } from "../reducers/notificationReducer"
import { useSelector, useDispatch } from 'react-redux'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()

    const vote = (id) => {
        const anecdote = anecdotes.find(a => a.id === id)

        dispatch(addVote({ ...anecdote, votes: anecdote.votes + 1 }));
        //console.log('state now: ', anecdotes)
        //const anecdoteForNotif = anecdotes.find(a => a.id === id)
        //const content = anecdoteForNotif.content

        dispatch(setNotif("you voted: " + anecdote.content, 5))
        /* setTimeout(() => {
            dispatch(resetNotif());
        }, 5000) */
        /* const reset = () => dispatch(resetNotif);
        dispatch(setNotif(content))
       
        setTimeout(() => {
            reset();
        }, 5000);

    } */
    }
    const filterValue = useSelector(state => state.filter).toLowerCase();

    return (
        <div>
            <h2>Anecdotes</h2>
            {anecdotes.sort((a, b) => b.votes - a.votes).filter((anecdote) => (anecdote.content).toLowerCase().includes(filterValue)).map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}</div>

    )
}

export default AnecdoteList