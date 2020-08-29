//import React from 'react'
import React, { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");

  /* const handleChange = (event) => {
    setNewNote(event.target.value) */

  const addBlog = (event) => {
    event.preventDefault();
    const blogObject = {
      title: newBlog,
      author: newAuthor,
      url: newUrl,
      likes: 0,
    };
    createBlog(blogObject);
  };
  return (
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
};

export default BlogForm;
