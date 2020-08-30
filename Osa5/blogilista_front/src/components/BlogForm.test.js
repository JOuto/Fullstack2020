import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BlogForm from "./BlogForm";

test("<BlogForm /> updates parent state and calls onSubmit", () => {
  const createBlog = jest.fn();

  const component = render(<BlogForm createBlog={createBlog} />);

  const input1 = component.container.querySelector("#eka");
  const input2 = component.container.querySelector("#toka");
  const input3 = component.container.querySelector("#kolmas");
  const form = component.container.querySelector("#form");

  fireEvent.change(input1, {
    target: { value: "testTitle" },
  });
  fireEvent.change(input2, {
    target: { value: "testAuthor" },
  });
  fireEvent.change(input3, {
    target: { value: "testUrl" },
  });
  fireEvent.submit(form);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0]).toEqual({
    title: "testTitle",
    author: "testAuthor",
    url: "testUrl",
    likes: 0,
  });
});
