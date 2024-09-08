import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import App from './App'
import { TEXTS as searchTexts } from './components/Search'

describe('When forecast is null', () => {
  it('should display the search component', () => {
    render(<App />)

    expect(screen.getByText(searchTexts.title)).toBeInTheDocument()
    expect(
      screen.getByPlaceholderText(searchTexts.search.placeholder)
    ).toBeInTheDocument()
    expect(screen.getByText(searchTexts.search.cta)).toBeInTheDocument()
  })
})

describe('When forecast is available', () => {
  it('should display the forecast component', () => {
    //
  })
})
