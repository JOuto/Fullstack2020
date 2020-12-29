import React, { useEffect, useState } from "react";
import { LOGIN } from "../queries";

import { useMutation, gr } from "@apollo/client";

const LoginForm = ({ setToken, show, setPage, setError }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    },
  });
  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      const genre = result.data.login.genre;
      console.log(result.data.login);
      setToken(token);
      setPage("authors");
      window.localStorage.setItem("library-user-token", token);
      window.localStorage.setItem("userGenre", genre);
    }
  }, [result.data]); // eslint-disable-line

  const submit = async (event) => {
    event.preventDefault();

    login({ variables: { username, password } });
  };
  if (!show) {
    return null;
  }
  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username{" "}
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password{" "}
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};
export default LoginForm;
