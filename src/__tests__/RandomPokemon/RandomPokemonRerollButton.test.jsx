import { render, screen } from '@testing-library/react'
import RandomPokemonRerollButton from '../../components/RandomPokemonRerollButton'

beforeEach(() => {
  // Mock localStorage data
  const mockData = { imagePath: '/Pictures/Pokémon_5.png' }
  localStorage.setItem('dailyPokemon', JSON.stringify(mockData))
})

test('RandomPokemonRerollButton has the correct text', () => {
  render(<RandomPokemonRerollButton />)

  // Check if the button has the correct text
  const buttonElement = screen.getByText(/Reroll Pokémon/i)

  expect(buttonElement).toBeInTheDocument()
})
