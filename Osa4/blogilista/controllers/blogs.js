const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
require("express-async-errors");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs.map((blog) => blog.toJSON()));
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  });

  const savedBlog = await blog.save();
  if (savedBlog) {
    response.json(savedBlog.toJSON());
  } else {
    response.status(500).end();
  }
});
blogsRouter.delete("/:id", async (request, response, next) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response, next) => {
  const body = request.body;

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { likes: body.likes },
    { runValidators: true }
  );
  if (updatedBlog) {
    response.json(updatedBlog);
  } else {
    response.status(400).end();
  }
});
module.exports = blogsRouter;
