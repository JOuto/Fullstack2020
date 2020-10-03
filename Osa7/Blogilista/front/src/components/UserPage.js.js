import React, { useState, useEffect, useRef } from "react";
import userService from "../services/users";

const UserPage = () => {
  //const [users, setUsers] = useState([]);

  const users = useEffect(() => {
    userService.getAll();
  }, []);
  const match = useRouteMatch("/:id");
  console.log(match);

  const anecdote1 = match
    ? anecdotes.find((a) => a.id === match.params.id)
    : null;

  const user = users.find((user) => user.username === "jtoni");

  return (
    <div>
      <button></button>
      {user.name}
    </div>
  );
};
export default UserPage;
