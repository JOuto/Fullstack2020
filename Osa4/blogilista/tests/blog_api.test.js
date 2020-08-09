const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const mongoose = require("mongoose");

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

  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();

  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
});

/* test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
}); */
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
  const newBlog = {
    title: "testiBlogi3",
    author: "testaaja",
    url: "www.testi.com",
    likes: 105,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");

  const contents = response.body.map((r) => r.content);
  console.log(response.body[2].title);
  expect(response.body).toHaveLength(initialBlogs.length + 1);
  expect(response.body[2].title).toContain("testiBlogi3");
});
test("blog has value id instead of _id", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body[0].id).toBeDefined();
});
afterAll(() => {
  mongoose.connection.close();
});
