import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

const user = {
  name: "jouni",
  username: "jeppe",
  passwordHash: "xyz",
};
const blog = {
  title: "testTitle",
  author: "testAuthor",
  url: "testUrl",
  likes: 999,
  user: user,
};

test("renders title", () => {
  const component = render(<Blog blog={blog} user={user} />);

  expect(component.container).toHaveTextContent("testTitle");
});
test("renders title, author, url and likes when button -show- is clicked", () => {
  const component = render(<Blog blog={blog} user={user} />);
  const button = component.getByText("show");
  fireEvent.click(button);
  expect(component.container).toHaveTextContent(
    "testTitle",
    "testAuthor",
    "testUrl",
    999
  );
});
test("pressing -like- button twice results event handler being called twice", () => {
  const mockHandler = jest.fn();
  const component = render(
    <Blog blog={blog} user={user} blogUpdate={mockHandler} />
  );

  const button2 = component.getByText("like");
  fireEvent.click(button2);
  fireEvent.click(button2);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
