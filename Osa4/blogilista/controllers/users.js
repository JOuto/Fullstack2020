const userRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
require("express-async-errors");
const Blog = require("../models/blog");

userRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs");
  response.json(users.map((user) => user.toJSON()));
});

userRouter.post("/", async (request, response) => {
  const body = request.body;

  if (body.password === undefined || body.password.length < 3) {
    return response.status(400).json({ error: "password is not valid" });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);
  console.log(passwordHash);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.json(savedUser);
});
module.exports = userRouter;
