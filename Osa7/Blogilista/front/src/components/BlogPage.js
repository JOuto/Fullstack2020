import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addLike } from "../reducers/blogReducer";
import blogService from "../services/blogs";

const BlogPage = ({ match }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  console.log(match);
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();
  const blog = blogs ? blogs.find((blog) => blog.id === match.params.id) : null;

  const blogUpdate = (id, blogObject) => {
    dispatch(addLike(blogObject, id));
  };
  const updateBlog = () => {
    const blogObject = {
      user: blog.user.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    };

    blogUpdate(blog.id, blogObject);
  };
  useEffect(() => {
    blogService.getComments().then((comments) => setComments(comments));
  }, []);

  const addComment = (event) => {
    event.preventDefault();
    const commentObject = {
      blogId: match.params.id,
      content: newComment,
    };
    blogService
      .postComment(commentObject, match.params.id)
      .then((response) => setComments(comments.concat(response)));

    console.log(comments);
    setNewComment("");
  };

  if (!blog) {
    return null;
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <p> {blog.likes}</p>
      <button className="like" onClick={updateBlog}>
        like
      </button>

      <h3>Comments</h3>
      {comments
        .filter((comment) => comment.blogId === match.params.id)
        .map((comment, i) => (
          <ul>
            <li key={i}>{comment.content}</li>
          </ul>
        ))}
      <form id="form" onSubmit={addComment}>
        <div>
          <input
            id="eka"
            type="text"
            value={newComment}
            name="Add comment"
            onChange={({ target }) => setNewComment(target.value)}
          />
        </div>

        <button id="submit" type="submit">
          add comment
        </button>
      </form>
    </div>
  );
};
export default BlogPage;
