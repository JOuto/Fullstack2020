import React from 'react'
import { addVote } from "../reducers/anecdoteReducer"
import { setNotif } from "../reducers/notificationReducer"
import { useSelector, useDispatch } from 'react-redux'
import { connect } from 'react-redux'

const AnecdoteList = (props) => {
    const anecdotes = props.anecdotes
    //const anecdotes = useSelector(state => state.anecdotes)
    //const dispatch = useDispatch()

    const vote = (id) => {
        const anecdote = anecdotes.find(a => a.id === id)

        props.addVote({ ...anecdote, votes: anecdote.votes + 1 });
        props.setNotif("you voted: " + anecdote.content, 5)

    }
    const filterValue = props.filter
    //const filterValue = useSelector(state => state.filter).toLowerCase();

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
const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes,
        filter: state.filter,
    }
}
const ConnectedAnecdoteList = connect(mapStateToProps, { addVote, setNotif })(AnecdoteList)
export default ConnectedAnecdoteList

//export default AnecdoteList