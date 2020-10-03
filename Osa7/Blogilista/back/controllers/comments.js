const commentRouter = require("express").Router();

require("express-async-errors");

commentRouter.post("/", async (request, response) => {
  const comments = await Comment.find({}).populate("user");
  response.json(comments.map((comment) => comment.toJSON()));
});
module.exports = commentRouter;
//api/blogs/:id/comments
