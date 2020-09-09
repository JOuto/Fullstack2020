
export const setNotif = (notificationtext, time) => {
    const timeForTimeout = time * 1000
    return async dispatch => {

        dispatch({
            type: 'SET_NOTIFICATION',
            data: {
                content: notificationtext,
            }
        })
        setTimeout(() => {
            dispatch({ type: "RESET_NOTIFICATION" })
        }, timeForTimeout)



    }
}

const reducer = (state = "", action) => {
    console.log('state now: ', state)
    console.log('action', action)
    switch (action.type) {

        case 'SET_NOTIFICATION':
            console.log(action.data)
            const notifToShow = action.data.content
            return notifToShow

        case "RESET_NOTIFICATION":
            return ""


        default:
            return state
    }
}

export default reducer