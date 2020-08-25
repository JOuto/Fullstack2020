import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Footer from "./components/Footer";
import blogService from "./services/blogs";
import loginService from "./services/login";

/* const Blog = ({blog}) => {
 
  
  return (
    <div>
      <p>{blog.</p>
    </div>
  )
} */

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

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
  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>
        blog
        <input
          type="text"
          value={newBlog}
          name="Blog"
          onChange={({ target }) => setNewBlog(target.value)}
        />
      </div>
      <div>
        author
        <input
          type="text"
          value={newAuthor}
          name="Author"
          onChange={({ target }) => setNewAuthor(target.value)}
        />
      </div>
      <div>
        url
        <input
          type="text"
          value={newUrl}
          name="Url"
          onChange={({ target }) => setNewUrl(target.value)}
        />
      </div>
      <button type="submit">save</button>
    </form>
  );
  const addBlog = (event) => {
    event.preventDefault();
    const blogObject = {
      title: newBlog,
      author: newAuthor,
      url: newUrl,
      likes: 0,
    };

    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));

      setNewUrl("");
      setNewAuthor("");
      setErrorMessage("new blog " + newBlog + " added");
      setNewBlog("");
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
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
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
          {blogForm()}

          <ul>
            {blogs.map((blog, i) => (
              <Blog key={i} blog={blog} />
            ))}
          </ul>

          <Footer />
        </div>
      )}
    </div>
  );
};

export default App;
