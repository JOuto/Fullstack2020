import React from 'react'
import { addAnecdote } from "../reducers/anecdoteReducer"
//import { toggleImportanceOf } from '../reducers/noteReducer'
import { useSelector, useDispatch } from 'react-redux'
import { setNotif, resetNotif } from "../reducers/notificationReducer"


const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addNewAnecdote = (event) => {
        event.preventDefault();
        const content = event.target.anec.value;
        event.target.anec.value = "";
        dispatch(addAnecdote(content))
        dispatch(setNotif("you added: " + content))
        setTimeout(() => {
            dispatch(resetNotif());
        }, 5000)

    }

    return (
        <       div><h2>create new</h2>
            <form onSubmit={addNewAnecdote}>
                <div><input name="anec" /></div>
                <button type="submit">create</button>
            </form></div>
    )
}
export default AnecdoteForm