import React, { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, blogUpdate, user, removeBlog }) => {
  const [fullBlogVisible, setFullBlogVisible] = useState(false);
  const hideWhenVisible = { display: fullBlogVisible ? "none" : "" };
  const showWhenVisible = { display: fullBlogVisible ? "" : "none" };
  const showIfUsersBlog = {
    display: user.username === blog.user.username ? "" : "none",
  };
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const updateBlog = () => {
    console.log(blog.user);
    const blogObject = {
      user: blog.user.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    };
    blogUpdate(blog.id, blogObject);
  };

  const remove = () => {
    removeBlog(blog.id);
  };
  Blog.propTypes = {
    blog: PropTypes.array.isRequired,
    blogUpdate: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    removeBlog: PropTypes.func.isRequired,
  };
  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        <p  >{blog.title}</p>
        <button className="show" onClick={() => setFullBlogVisible(true)}>show</button>
      </div>
      <div style={showWhenVisible}>
        <p>{blog.title}</p>
        <p>{blog.author}</p>
        <p>{blog.url}</p>
        <p className={"likes"}>
          {blog.likes}
          <button className="like" onClick={updateBlog}>
            like
          </button>
        </p>
        <button style={showIfUsersBlog} onClick={remove}>
          remove
        </button>

        <button onClick={() => setFullBlogVisible(false)}>hide</button>
      </div>
    </div>
  );
};
export default Blog;
