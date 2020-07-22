import React, { useState } from "react";
import ReactDOM from "react-dom";

const Anecdote = (props) => {
  return (
    <p>
      {props.anecdotes[props.selected]} <br />
      has {props.votes[props.value]} votes
    </p>
  );
};

const Button = (props) => {
  return <button onClick={props.handleClick}> {props.text} </button>;
};
const MostVoted = ({ votes, anecdotes }) => {
  let returnValue = votes[0];
  let i = 0;

  for (let index = 0; index <= votes.length; index++) {
    if (votes[index] > returnValue) {
      returnValue = votes[index];
      i = index;
    }
  }

  return (
    <div>
      <p>
        {anecdotes[i]} <br />
        has {returnValue} votes
      </p>
    </div>
  );
};

const App = (props) => {
  const points = Array(6).fill(0);

  const [selected, setSelected] = useState(0);
  const [votes, updateVotes] = useState(points);

  const handleClick = () => {
    setSelected(Math.floor(Math.random() * 6 + 0));
  };
  const handleClick2 = () => {
    const copy = [...votes];
    copy[selected] += 1;
    updateVotes(copy);
  };

  console.log(selected);
  const value = selected;

  console.log(votes);

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <Anecdote
        anecdotes={anecdotes}
        selected={selected}
        value={value}
        votes={votes}
      />
      <Button text={"vote"} handleClick={handleClick2} />
      <Button text={"next anecdote"} handleClick={handleClick} />
      <h2>Anecdote with most votes</h2>
      <MostVoted anecdotes={anecdotes} votes={votes} />
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
