import React, { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommended from "./components/Recommended";
import { useApolloClient } from "@apollo/client";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(
    localStorage.getItem("library-user-token")
  );

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    //setPage("login");
  };
  const client = useApolloClient();
  if (!token) {
    return (
      <div>
        <div>
          <button onClick={() => setPage("authors")}>authors</button>
          <button onClick={() => setPage("books")}>books</button>
          <button onClick={() => setPage("login")}>login</button>
        </div>

        <Authors show={page === "authors"} />
        <LoginForm
          setPage={setPage}
          setToken={setToken}
          show={page === "login"}
        />
        <Books show={page === "books"} />
      </div>
    );
  }
  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
        <button onClick={() => setPage("recommended")}>recommended</button>
        <button onClick={logout}>logout</button>
      </div>
      <NewBook show={page === "add"} />
      <Authors show={page === "authors"} user={token} />
      <Recommended show={page === "recommended"} token={token} />
      <Books show={page === "books"} client={client} />
    </div>
  );
};

export default App;
