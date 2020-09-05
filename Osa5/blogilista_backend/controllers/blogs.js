const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
require("express-async-errors");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user");
  response.json(blogs.map((blog) => blog.toJSON()));
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  //const user = await User.findOne();
  const token = request.token;
  console.log(token);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog.id);
  await user.save();

  if (savedBlog) {
    response.json(savedBlog.toJSON());
  } else {
    response.status(500).end();
  }
});
blogsRouter.delete("/:id", async (request, response, next) => {
  const body = request.body;
  const token = request.token;
  const decodedToken = jwt.verify(token, process.env.SECRET);

  const blog = await Blog.findById(request.params.id);

  if (!token || blog.user.toString() !== decodedToken.id.toString()) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response, next) => {
  const body = request.body;
  /* //const user = await User.findOne();
  const token = request.token;
  console.log(token);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const user = await User.findById(decodedToken.id);
 */
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: body.user,
    },
    { runValidators: true }
  );
  if (updatedBlog) {
    response.json(updatedBlog);
  } else {
    response.status(400).end();
  }
});
module.exports = blogsRouter;
