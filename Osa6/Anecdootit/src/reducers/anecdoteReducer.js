import anecdoteService from "../services/anecdotes"

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

/* export const addAnecdote = (data) => {


  return {
    type: 'NEW_ANECDOTE',
    data,
  }
} */
export const addAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'ADD',
      data: newAnecdote,
    })
  }
}
export const addVote = content => {
  return async dispatch => {
    anecdoteService.newVote(content)
    dispatch({
      type: "VOTE",
      data: { id: content.id }
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {

    case 'VOTE':
      const id = action.data.id
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : { ...anecdote, votes: anecdote.votes + 1 })

    case "ADD":
      //const c = action.data.content
      const randomId = (100000 * Math.random()).toFixed(0)
      const anecdoteToAdd = {
        content: action.data.content,
        id: action.data.id,
        votes: 0
      }
      console.log(anecdoteToAdd)
      return state.concat(anecdoteToAdd)

    case 'INIT_ANECDOTES':
      return action.data

    default:
      return state
  }
}

export default reducer