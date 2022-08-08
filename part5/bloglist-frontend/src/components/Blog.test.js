import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  }
  const { container } = render(<Blog blog={blog} />)
  expect(container).toHaveTextContent('React patterns')
  expect(container).toHaveTextContent('Michael Chan')

  const blogDetailDiv = screen.getByTestId('blog-detail')
  expect(blogDetailDiv).toHaveStyle('display: none')
})