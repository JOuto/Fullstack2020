export const setFilter = (content) => {

    return {
        type: 'SET_FILTER',
        data: {
            content,
        }
    }
}


const reducer = (state = "", action) => {
    console.log('state now: ', state)
    console.log('action', action)
    switch (action.type) {

        case 'SET_FILTER':
            const filter = action.data.content
            return filter



        default:
            return state
    }
}

export default reducer