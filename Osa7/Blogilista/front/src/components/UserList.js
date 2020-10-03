import React, { useState, useEffect, useRef } from "react";
import userService from "../services/users";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useHistory,
} from "react-router-dom";
import { useSelector } from "react-redux";

const UserList = () => {
  const padding = {
    paddingRight: 5,
  };

  const users = useSelector((state) => state.user.users);

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tr>
          <th></th>
          <th>blogs created</th>
        </tr>
        {users &&
          users.map((user) => (
            <tr>
              <td>
                <Link style={padding} to={`/${user.id}`}>
                  {user.name}
                </Link>
              </td>{" "}
              <td> {user.blogs.length}</td>{" "}
            </tr>
          ))}
      </table>
    </div>
  );
};
export default UserList;
