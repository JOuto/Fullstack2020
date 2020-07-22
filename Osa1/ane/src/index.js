import React, { useState } from "react";
import ReactDOM from "react-dom";

const Anecdote = ({ anecdote }) => {
  return (
    <>
      <p>
        {anecdote.text} <br />
        has {anecdote.votes} votes
      </p>
    </>
  );
};

const AnecdoteWithVoting = ({ anecdote, handleVoting }) => {
  const onClick = () => handleVoting(anecdote.id);
  return (
    <>
      <Anecdote anecdote={anecdote} />
      <Button text={"vote"} handleClick={onClick} />
    </>
  );
};

const Button = (props) => {
  return <button onClick={props.handleClick}> {props.text} </button>;
};

const App = ({ initialAnecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [anecdotes, setAnecdotes] = useState(initialAnecdotes);

  const handleVoting = (index) => {
    const newArray = anecdotes.map((anecdote) => {
      if (anecdote.id !== index) {
        return anecdote;
      }
      return {
        ...anecdote,
        votes: anecdote.votes + 1,
      };
    });
    setAnecdotes(newArray);
  };
  const selectRandomAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex);
  };

  const selectedAnecdote = anecdotes.find(
    (anecdote) => anecdote.id === selected
  );
  const mostVotedAnecdote = anecdotes.sort((a, b) => a.votes - b.votes)[0];

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <AnecdoteWithVoting
        anecdote={selectedAnecdote}
        handleVoting={handleVoting}
      />
      <Button text={"next anecdote"} handleClick={selectRandomAnecdote} />
      <h2>Anecdote with most votes</h2>
      <Anecdote anecdote={mostVotedAnecdote} />
    </div>
  );
};

const anecdotes2 = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const anecdoteObjectArray = anecdotes2.map((anecdote, index) => ({
  id: index,
  text: anecdote,
  votes: 0,
}));

ReactDOM.render(
  <App initialAnecdotes={anecdoteObjectArray} />,
  document.getElementById("root")
);
