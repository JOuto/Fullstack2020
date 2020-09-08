

export const setNotif = (content) => {

    return {
        type: 'SET_NOTIFICATION',
        data: {
            content,
        }
    }
}
export const resetNotif = () => {
    return {
        type: "RESET_NOTIFICATION",
    }
}

const reducer = (state = "", action) => {
    console.log('state now: ', state)
    console.log('action', action)
    switch (action.type) {

        case 'SET_NOTIFICATION':
            const notifToShow = action.data.content
            return notifToShow

        case "RESET_NOTIFICATION":
            return ""


        default:
            return state
    }
}

export default reducer