import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders blog', () => {
  const blog = {
    title: 'title',
    author: 'author',
    url: 'url',
    likes: 0
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'title'
  )
  expect(component.container).toHaveTextContent(
    'author'
  )
  expect(component.container).not.toHaveTextContent(
    'url'
  )
  expect(component.container).not.toHaveTextContent(
    '0'
  )
})
