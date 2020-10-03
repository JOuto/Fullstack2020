import React from "react";
import { Link } from "react-router-dom";
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
        <tbody>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </tbody>

        {users &&
          users.map((user) => (
            <tbody key={user.id}>
              <tr>
                <td key={user.id}>
                  <Link style={padding} to={`/${user.id}`}>
                    {user.name}
                  </Link>
                </td>
                <td> {user.blogs.length}</td>
              </tr>
            </tbody>
          ))}
      </table>
    </div>
  );
};
export default UserList;
