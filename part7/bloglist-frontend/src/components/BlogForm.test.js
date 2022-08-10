import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";

test("calls event handler correctly when new blog is created", async () => {
  const createBlog = jest.fn();
  const user = userEvent.setup();

  const component = render(<BlogForm createBlog={createBlog} />);

  const inputTitle = component.getByLabelText("title");
  const inputAuthor = component.getByLabelText("author");
  const inputUrl = component.getByLabelText("url");
  const sendButton = component.getByText("save");

  await user.type(inputTitle, "test title");
  await user.type(inputAuthor, "test author");
  await user.type(inputUrl, "test url");
  await user.click(sendButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe("test title");
  expect(createBlog.mock.calls[0][0].author).toBe("test author");
  expect(createBlog.mock.calls[0][0].url).toBe("test url");
});
