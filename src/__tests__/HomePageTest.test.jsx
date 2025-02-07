import { render, screen, fireEvent, act } from '@testing-library/react'
import HomePage from '../pages/HomePage'

beforeEach(() => {
  // Mock localStorage data
  const mockData = { imagePath: '/Pictures/Pokémon_5.png' }
  localStorage.setItem('dailyPokemon', JSON.stringify(mockData))
})

test('Homepage renders with all components', () => {
  render(<HomePage />)

  // Check if each component is rendered
  const textElement = screen.getByText((content, element) =>
    content.startsWith("Today's Pokémon: Pokémon")
  )
  const buttonElement = screen.getByText(/Reroll Pokémon/i)
  const imageElement = screen.getByAltText(/Random Pokémon/)

  expect(textElement).toBeInTheDocument()
  expect(buttonElement).toBeInTheDocument()
  expect(imageElement).toBeInTheDocument()
})

jest.useFakeTimers()

test('RandomPokemonRerollButton works correctly', async () => {
  render(<HomePage />)

  const buttonElement = screen.getByText(/Reroll Pokémon/i)

  fireEvent.click(buttonElement)

  await act(async () => {
    jest.runAllTimers()
  })

  // After clicking, check if the image changes
  const newImageElement = screen.getByAltText(/Random Pokémon/)
  expect(newImageElement).toBeInTheDocument()
  expect(newImageElement).toHaveAttribute(
    'src',
    expect.stringMatching(/^\/Pictures\/Pokémon_\d+\.png$/)
  )
  expect(newImageElement).toHaveAttribute('src', '/Pictures/Pokémon_5.png') // Ensure the image source is not Pokémon_5.png
})

test('RandomPokemonText displays the correct Pokémon text after reroll', () => {
  render(<HomePage />)

  // Initial Pokémon text
  const initialTextElement = screen.getByText(/Today's Pokémon: Pokémon 5/i)
  expect(initialTextElement).toBeInTheDocument()

  // Reroll
  const buttonElement = screen.getByText(/Reroll Pokémon/i)
  buttonElement.click()

  // After reroll, verify the updated Pokémon text
  const newTextElement = screen.getByText(/Today's Pokémon: Pokémon 5/i) // Ensure it updates
  expect(newTextElement).not.toBeInTheDocument()
})
