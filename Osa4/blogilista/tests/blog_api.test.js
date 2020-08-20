const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const mongoose = require("mongoose");
const logger = require("../utils/logger");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const testUser = new User({
  username: "testitunnus",
  name: "testinimi",
  passwordHash: "testisalasana",
});

const initialBlogs = [
  {
    title: "testiBlogi1",
    author: "testaaja",
    url: "www.testi.com",
    likes: 103,
  },
  {
    title: "testiBlogi2",
    author: "testaaja",
    url: "www.testi.com",
    likes: 104,
  },
];
beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  let testObject = new Blog(initialBlogs[0]);
  await testObject.save();

  testObject = new Blog(initialBlogs[1]);
  await testObject.save();

  testObject = new User(testUser);
  await testObject.save();
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});
test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(initialBlogs.length);
});

test("a specific blog is within the returned notes", async () => {
  const response = await api.get("/api/blogs");

  const contents = response.body.map((r) => r.content);

  expect(response.body[0].title).toContain("testiBlogi1");
});
test("a valid blog can be added ", async () => {
  const user = await User.findOne();
  const userForToken = {
    username: user.username,
    id: user._id,
  };
  const token = jwt.sign(userForToken, process.env.SECRET);

  const newBlog = {
    title: "testiBlogi3",
    author: "testaaja",
    url: "www.testi.com",
    likes: 105,
    user: user,
  };

  await api

    .post("/api/blogs")
    .set("Authorization", "bearer " + token)
    .send(newBlog)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");

  const contents = response.body.map((r) => r.content);
  console.log(response.body[2].title);
  expect(response.body).toHaveLength(initialBlogs.length + 1);
  expect(response.body[2].title).toContain("testiBlogi3");
});
test("blog has field id instead of _id", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body[0].id).toBeDefined();
});
test("if likes for posted blog is not defined, likes = 0", async () => {
  const blogWithoutLikes = {
    title: "testiBlogi4",
    author: "testaaja",
    url: "www.testi.com",
  };
  let blogObject = new Blog(blogWithoutLikes);
  const savedBlog = await blogObject.save();
  console.log(savedBlog);

  const response = await api.get("/api/notes");
  expect(savedBlog.likes).toBe(0);
});
test("if title or url is missing, response 400 bad request will follow", async () => {
  const user = await User.findOne();
  const userForToken = {
    username: user.username,
    id: user._id,
  };
  const token = jwt.sign(userForToken, process.env.SECRET);

  const blogWithoutTitle = {
    author: "testaaja",
    url: "www.testi.com",
    user: user,
  };
  const blogWithoutUrl = {
    title: "testiblogi",
    author: "testaaja",
    user: user,
  };

  await api
    .post("/api/blogs")
    .set("Authorization", "bearer " + token)
    .send(blogWithoutTitle)
    .expect(400);

  await api
    .post("/api/blogs")
    .set("Authorization", "bearer " + token)
    .send(blogWithoutUrl)
    .expect(400);
});

test("username or password shorter than 4 characters results proper error message", async () => {
  const tooShortUsernameUser = new User({
    username: "123",
    name: "1234",
    passwordHash: "1234",
  });
  const tooShortPasswordUser = new User({
    username: "1234",
    name: "1234",
    passwordHash: "123",
  });

  await api.post("/api/users").send(tooShortUsernameUser).expect(400);
  await api.post("/api/users").send(tooShortPasswordUser).expect(400);
});

test("an attemt to post blog without token results 401 unauthorized message", async () => {
  const user = await User.findOne();
  const blogWithoutToken = new Blog({
    title: "testiBlogi3",
    author: "testaaja",
    url: "www.testi.com",
    likes: 105,
    user: user,
  });
  await api.post("/api/blogs").send(blogWithoutToken).expect(401);
});
afterAll(() => {
  mongoose.connection.close();
});
