const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      //const state = { ...state, good: state.good + 1 }
      return state = { ...state, good: state.good + 1 }
    case 'OK':
      //const state = { ...state, ok: state.ok + 1 }
      return state = { ...state, ok: state.ok + 1 }
    case 'BAD':
      //const state = { ...state, bd: state.bad + 1 }
      return state = { ...state, bad: state.bad + 1 }
    case 'ZERO':
      /*  const state = {
         good: 0,
         ok: 0,
         bad: 0
       } */
      return state = {
        good: 0,
        ok: 0,
        bad: 0
      }
    default: return state
  }

}

export default counterReducer