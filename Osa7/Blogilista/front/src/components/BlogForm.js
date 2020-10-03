//import React from 'react'
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

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
    <div>
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>blog</Form.Label>
          <Form.Control
            type="text"
            name="Blog"
            value={newBlog}
            onChange={({ target }) => setNewBlog(target.value)}
          />
          <Form.Label>author</Form.Label>
          <Form.Control
            type="text"
            name="Author"
            value={newAuthor}
            onChange={({ target }) => setNewAuthor(target.value)}
          />
          <Form.Label>url</Form.Label>
          <Form.Control
            type="text"
            name="Url"
            value={newUrl}
            onChange={({ target }) => setNewUrl(target.value)}
          />
          <Button variant="primary" type="submit">
            create
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default BlogForm;
