import { render, screen } from '@testing-library/react'
import RandomPokemonText from '../../components/RandomPokemonText'

beforeEach(() => {
  // Mock localStorage data
  const mockData = { imagePath: '/Pictures/Pokémon_5.png' }
  localStorage.setItem('dailyPokemon', JSON.stringify(mockData))
})

test('RandomPokemonText renders dynamic Pokémon text', () => {
  render(<RandomPokemonText />)

  // Match element with text
  const element = screen.getByText((content, element) => {
    return content.startsWith("Today's Pokémon: Pokémon")
  })

  expect(element).toBeInTheDocument()
})
