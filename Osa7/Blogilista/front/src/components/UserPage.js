import React, { useState, useEffect, useRef } from "react";
import userService from "../services/users";
import { useSelector, useDispatch } from "react-redux";

const UserPage = ({ id }) => {
  const users = useSelector((state) => state.user.users);
  console.log(id);
  const user = users.find((user) => user.id === id.params.id);

  if (!user) {
    return null;
  }
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>

      {user.blogs.map((blog) => (
        <ul
          style={{
            margin: 0,
          }}
        >
          {" "}
          <li>{blog.title}</li>
        </ul>
      ))}
    </div>
  );
};
export default UserPage;
