import React, { useEffect, useRef } from "react";
import { Table, Alert } from "react-bootstrap";
import UserList from "./components/UserList";
import Footer from "./components/Footer";
import blogService from "./services/blogs";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Menu from "./components/Menu";
import { setNotif } from "./reducers/notificationReducer";
import { setUser, resetUser, initializeUsers } from "./reducers/userReducer";
import styled from "styled-components";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";
import {
  initializeBlog,
  addBlog,
  addLike,
  remove,
} from "./reducers/blogReducer";

import { useSelector, useDispatch } from "react-redux";
import UserPage from "./components/UserPage";
import BlogPage from "./components/BlogPage";
import img2 from "./img/detail3.jpg";

const App = () => {
  const Header = styled.h1`
    border: 2px solid Navy;
    background-image: url(${img2});
  `;
  const Navigation = styled.div`
    background: black;
    padding: 1em;
    background-image: url(${img2});
    border: 2px solid Navy;
  `;

  const Page = styled.div`
    padding: 1em;

    background-image: url(${img2});
    width: 1000px;
    height: 1000px;
  `;
  /*  const Menu = styled.Menu`
    background-image: url(${img});
  `; */

  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification.content);
  const blogs = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(initializeBlog());
  }, [dispatch]);
  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);
  const users = useSelector((state) => state.user.users);
  console.log(users);

  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const userForState = JSON.parse(loggedUserJSON);
      dispatch(setUser(userForState));
    }
  }, []);

  const blogFormRef = useRef();

  const blogUpdate = (id, blogObject) => {
    dispatch(addLike(blogObject, id));
  };
  const deleteBlog = (id) => {
    if (window.confirm("you sure?")) {
      dispatch(remove(id));

      dispatch(setNotif("blog removed", 5));
    }
  };
  const createBlog = (blogObject) => {
    dispatch(addBlog(blogObject));
    blogFormRef.current.toggleVisibility();
    dispatch(setNotif("new blog " + blogObject.title + " added", 5));
  };

  const handleLogOut = () => {
    dispatch(setNotif(user.name + " logged out", 5));
    blogService.setToken(null);
    window.localStorage.clear();
    dispatch(resetUser());
    setTimeout(() => {
      console.log(user);
    }, 5000);

    console.log(user);
  };

  const loggedUser = JSON.parse(
    window.localStorage.getItem("loggedBlogappUser")
  );
  const id = useRouteMatch("/:id");
  const blogMatch = useRouteMatch("/blogs/:id");
  return (
    <Page>
      <div class="container">
        {notification && (
          <div>
            <h4 class="alert-heading">Well done!</h4>
            <Alert variant="success">{notification}</Alert>{" "}
          </div>
        )}
        <Header>Blogs</Header>

        {user === null && (
          <LoginForm
            user={user}
            dispatch={dispatch}
            handleLogOut={handleLogOut}
          />
        )}
        {loggedUser !== null && (
          <div>
            <Menu loggedUser={loggedUser} handleLogOut={handleLogOut} />

            <Switch>
              <Route path="/blogs/:id">
                <BlogPage match={blogMatch} /* addLike={addLike} */ />
              </Route>
              <Route path="/users">
                <UserList />
              </Route>
              <Route path="/:id">
                <UserPage id={id} />
              </Route>

              <Route path="/">
                <Navigation>
                  <Table bordered>
                    <tbody>
                      <ul>
                        {blogs
                          .sort((a, b) => b.likes - a.likes)
                          .map((blog, i) => (
                            <tr key={blog.id}>
                              <td>
                                <Link to={`/blogs/${blog.id}`}>
                                  {blog.title}
                                </Link>
                              </td>
                            </tr>
                          ))}
                      </ul>
                    </tbody>
                  </Table>
                </Navigation>
                <h2>Create new</h2>
                <Togglable buttonLabel="new blog" ref={blogFormRef}>
                  <BlogForm createBlog={createBlog} />
                </Togglable>
              </Route>
            </Switch>
            <Footer />
          </div>
        )}
      </div>
    </Page>
  );
};

export default App;
