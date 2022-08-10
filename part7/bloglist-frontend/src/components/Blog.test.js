import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("Blog", () => {
  let component;
  const blog = {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  };
  const user = {
    username: "bikinibigboy",
    name: "spongebob",
  };
  const mockHandlerRemove = jest.fn();
  const mockHandlerUpdate = jest.fn();

  beforeEach(() => {
    component = render(
      <Blog
        blog={blog}
        updateBlog={mockHandlerUpdate}
        deleteBlog={mockHandlerRemove}
        user={user}
      />
    );
  });

  test("renders content without likes/url", () => {
    const { container } = component;
    expect(container).toHaveTextContent("React patterns");
    expect(container).toHaveTextContent("Michael Chan");

    const blogDetailDiv = screen.getByTestId("blog-detail");
    expect(blogDetailDiv).toHaveStyle("display: none");
  });

  test("renders content with likes/url", async () => {
    const { container } = component;

    const user = userEvent.setup();
    const button = screen.getByText("view");
    await user.click(button);

    expect(container).toHaveTextContent("React patterns");
    expect(container).toHaveTextContent("Michael Chan");
    expect(container).toHaveTextContent("Likes");
    expect(container).toHaveTextContent(blog.likes);
    expect(container).toHaveTextContent(blog.url);

    const blogDetailDiv = screen.getByTestId("blog-detail");
    expect(blogDetailDiv).not.toHaveStyle("display: none");
  });

  test("calls update blog twice if like button is clicked twice", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("view");
    await user.click(button);

    const likeButton = screen.getByText("like");
    await user.click(likeButton);
    await user.click(likeButton);

    expect(mockHandlerUpdate.mock.calls).toHaveLength(2);
  });
});
