export const setNotif = (notificationtext, time) => {
  const timeForTimeout = time * 1000;

  return async (dispatch) => {
    dispatch({
      type: "SET_NOTIFICATION",
      data: {
        content: notificationtext,
      },
    });

    const timeoutId = setTimeout(() => {
      dispatch({ type: "RESET_NOTIFICATION" });
    }, timeForTimeout);

    //clearTimeout(id - 1);

    dispatch({ type: "UPDATE_TIMEOUT", data: { id: timeoutId } });
  };
};

const reducer = (state = { content: "", id: null }, action) => {
  console.log("state now: ", state);
  console.log("action", action);
  switch (action.type) {
    case "SET_NOTIFICATION":
      console.log(action.data);
      const notifToShow = action.data.content;
      return { ...state, content: notifToShow };

    case "RESET_NOTIFICATION":
      return { ...state, content: "" };

    case "UPDATE_TIMEOUT":
      clearTimeout(state.id);
      return { ...state, id: action.data.id };

    default:
      return state;
  }
};

export default reducer;
