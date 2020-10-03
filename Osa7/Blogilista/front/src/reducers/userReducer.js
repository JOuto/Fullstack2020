import blogService from "../services/blogs";
import userService from "../services/users";
import { useSelector, useDispatch } from "react-redux";

/* const dispatch = useDispatch();

export const setUser = (user, dispatch) => {
  dispatch({ type: "SET_USER", data: user });
};
 */

export const setUser = (user) => {
  return async (dispatch) => {
    blogService.setToken(user.token);
    dispatch({
      type: "SET_USER",
      data: user,
    });
  };
};

export const resetUser = () => {
  return { type: "RESET_USER" };
};

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll();
    dispatch({
      type: "INIT_USERS",
      data: users,
    });
  };
};
const reducer = (state = { user: null, users: [] }, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.data };

    case "RESET_USER":
      console.log(state);
      return { ...state, user: null };

    case "INIT_USERS":
      return { ...state, users: action.data };

    default:
      return state;
  }
};
export default reducer;
