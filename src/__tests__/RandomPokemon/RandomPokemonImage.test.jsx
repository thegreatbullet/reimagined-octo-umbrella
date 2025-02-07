import { render, screen } from '@testing-library/react'
import RandomPokemonImage from '../../components/RandomPokemonImage'

beforeEach(() => {
  // Mock localStorage data
  const mockData = { imagePath: '/Pictures/Pokémon_5.png' }
  localStorage.setItem('dailyPokemon', JSON.stringify(mockData))
})

test('RandomPokemonImage renders an image', () => {
  render(<RandomPokemonImage />)

  // Check if the image element is rendered
  const imageElement = screen.getByRole('img')

  expect(imageElement).toBeInTheDocument()
  expect(imageElement).toHaveAttribute('src', '/Pictures/Pokémon_5.png')
})
