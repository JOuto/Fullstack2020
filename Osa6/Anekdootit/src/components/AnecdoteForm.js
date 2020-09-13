import React from "react";
import { addAnecdote } from "../reducers/anecdoteReducer";
//import { toggleImportanceOf } from '../reducers/noteReducer'
import { setNotif, resetNotif } from "../reducers/notificationReducer";
import { connect } from "react-redux";

const AnecdoteForm = (props) => {
  //const dispatch = useDispatch()

  const addNewAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anec.value;
    event.target.anec.value = "";

    props.addAnecdote(content);
    props.setNotif("you added: " + content, 5);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addNewAnecdote}>
        <div>
          <input name="anec" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

const ConnectedAnecdoteForm = connect(null, { addAnecdote, setNotif })(
  AnecdoteForm
);
export default ConnectedAnecdoteForm;
