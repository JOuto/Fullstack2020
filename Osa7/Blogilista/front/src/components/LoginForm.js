import React, { useState } from "react";
import { setNotif } from "../reducers/notificationReducer";
import blogService from "../services/blogs";
import loginService from "../services/login";
import { setUser, resetUser } from "../reducers/userReducer";
import { Form, Button } from "react-bootstrap";

const LoginForm = ({ dispatch, user, handleLogOut }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user1 = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user1));

      blogService.setToken(user1.token);
      dispatch(setUser(user1));
      setUsername("");
      setPassword("");
    } catch (exception) {
      dispatch(setNotif("wrong username or password", 5));
    }
  };
  const loggedUser = JSON.parse(
    window.localStorage.getItem("loggedBlogappUser")
  );

  return (
    <Form onSubmit={handleLogin}>
      <Form.Group>
        <Form.Label>username</Form.Label>
        <Form.Control
          type="text"
          name="Username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        <Form.Label>password</Form.Label>
        <Form.Control
          type="text"
          name="Password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <Button variant="primary" type="submit">
          login
        </Button>
      </Form.Group>
    </Form>

    /*  <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id={"user"}
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id={"pass"}
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id={"login"} type="submit">
        login
      </button>
    </form> */
  );
};

/* export const handleLogOut = ({ dispatch, user }) => {
  const user1 = user ? user : { name: "hep" };
  dispatch(setNotif(user1.name + " logged out", 5));
  blogService.setToken(null);
  window.localStorage.clear();
  dispatch(resetUser());
  setTimeout(() => {
    //console.log(user);
  }, 5000);

  console.log(user);
}; */

export default LoginForm;
