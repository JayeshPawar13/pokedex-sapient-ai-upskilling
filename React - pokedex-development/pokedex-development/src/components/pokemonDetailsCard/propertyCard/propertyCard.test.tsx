import React from 'react';
import { render, screen } from '@testing-library/react';
import { PokemonCardData } from '../../pokemonCard/pokemonCard';
import EvolutionChainCard from '../evolutionChainCard/evolutionChainCard';

// Mock PokemonCard
jest.mock('../../pokemonCard/pokemonCard', () => (props: any) => (
  <div data-testid="pokemon-card">{props.data.name}</div>
));

// Mock image asset
jest.mock('../../../assets/icons/right-arrow.png', () => 'right-arrow.png');

describe('EvolutionChainCard Component', () => {
  const mockPokemonData: PokemonCardData = {
    name: 'bulbasaur',
    id: 1,
    types: [],
    sprites: {
      front_default: '',
    },
  };

  it('renders the correct number of evolution cards and arrows', () => {
    render(<EvolutionChainCard data={mockPokemonData} />);

    const cards = screen.getAllByTestId('pokemon-card');
    const arrows = screen.getAllByAltText('right arrow icon');

    // There should be 3 cards and 2 arrows (because last one has no arrow)
    expect(cards).toHaveLength(3);
    expect(arrows).toHaveLength(2);

    cards.forEach(card => {
      expect(card).toHaveTextContent('bulbasaur');
    });
  });
});
