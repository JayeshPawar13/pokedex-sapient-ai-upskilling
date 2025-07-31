import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PokemonCard, { PokemonCardData } from './pokemonCard';
import '@testing-library/jest-dom';

const mockData: PokemonCardData = {
  name: 'bulbasaur',
  id: 1,
  types: [{ type: { name: 'grass' } }],
  sprites: {
    other: {
      dream_world: {
        front_default: 'https://example.com/bulbasaur.svg',
      },
    },
    front_default: 'https://fallback.com/bulbasaur.png',
  },
};

describe('PokemonCard Component', () => {

  it('renders the dream_world image if available', () => {
    render(<PokemonCard data={mockData} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', mockData.sprites?.other?.dream_world?.front_default);
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<PokemonCard data={mockData} onClick={handleClick} />);
    fireEvent.click(screen.getByRole('presentation'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('uses placeholder image if no sprites available', () => {
    const dataWithNoImage: PokemonCardData = {
      ...mockData,
      sprites: {},
    };
    render(<PokemonCard data={dataWithNoImage} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', expect.stringContaining('placeholder.com'));
  });
});
