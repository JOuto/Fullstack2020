import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Footer from "./components/Footer";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const blogFormRef = useRef();

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const blogUpdate = (id, blogObject) => {
    console.log(blogs);
    blogService.update(id, blogObject);
    const update = [...blogs];

    update.map((blog) => {
      if (blog.id === id) {
        return (blog.likes = blogObject.likes);
      }
    });
    console.log(update);
    setBlogs(update);
  };
  const removeBlog = (id) => {
    if (window.confirm("you sure?")) {
      blogService.remove(id);
      setBlogs(blogs.filter((blog) => blog.id !== id));
    }
  };
  const createBlog = (blogObject) => {
    blogService.create(blogObject).then((returnedBlog) => {
      blogFormRef.current.toggleVisibility();
      setBlogs(blogs.concat(returnedBlog));
      setErrorMessage("new blog " + blogObject.title + " added");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    });
  };

  const handleLogOut = () => {
    setErrorMessage(user.name + " logged out");
    setUser(null);
    window.localStorage.clear();
    blogService.setToken(null);
    //window.location.reload();
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user1 = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user1));

      blogService.setToken(user1.token);
      setUser(user1);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("wrong username or password");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <div>
      <h1>Blogs</h1>

      <Notification message={errorMessage} />

      {user === null && loginForm()}
      {user !== null && (
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogOut}>logout</button>
          <h2>Create new</h2>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
          </Togglable>

          <ul>
            {blogs
              .sort((a, b) => b.likes - a.likes)
              .map((blog, i) => (
                <Blog
                  key={i}
                  user={user}
                  blog={blog}
                  blogUpdate={blogUpdate}
                  removeBlog={removeBlog}
                />
              ))}
          </ul>

          <Footer />
        </div>
      )}
    </div>
  );
};

export default App;
