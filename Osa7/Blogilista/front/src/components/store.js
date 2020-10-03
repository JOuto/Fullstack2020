import { createStore, combineReducers, applyMiddleware } from "redux";
import blogReducer from "../reducers/blogReducer";
import notificationReducer from "../reducers/notificationReducer";
import userReducer from "../reducers/userReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const reducer = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer,
  user: userReducer,
  /* filter: filterReducer, */
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
