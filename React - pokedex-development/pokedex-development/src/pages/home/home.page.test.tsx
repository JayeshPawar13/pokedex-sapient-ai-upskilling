import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PokemonContext, { PokemonContextType } from '../../context/pokemonContext/pokemon.context';
import HomePage from './home.page';

// Mocks
const mockGetPokemonData = jest.fn();
const mockPokemonList = [
  { id: 1, name: 'bulbasaur', sprites: {}, types: [] },
  { id: 2, name: 'ivysaur', sprites: {}, types: [] },
];

const mockContextValue: Partial<PokemonContextType> = {
  state: {
    pokemonsList: [],
    allPokemonsList: [],
    pokemonSelectedId: null,
    pokemonData: {
      id: 1,
      name: 'bulbasaur',
      types: [{ type: { name: 'grass' } }],
      sprites: {},
      // add all required fields of PokemonCardData
    },
    pokemonsTypes: [],
    pokemonGenderList: [],
    isLoading: false,
    isLoadMoreInprogress: false
  },
  getPokemonData: jest.fn(),
};



const renderHomePage = () => {
  render(
    <PokemonContext.Provider value={mockContextValue}>
      <HomePage />
    </PokemonContext.Provider>
  );
};

describe('HomePage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders Pokémon cards', () => {
    renderHomePage();
    expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
    expect(screen.getByText(/ivysaur/i)).toBeInTheDocument();
  });

  it('calls getPokemonData on Load More click', () => {
    renderHomePage();
    fireEvent.click(screen.getByText(/load more/i));
    expect(mockGetPokemonData).toHaveBeenCalled();
  });

  it('opens DetailPage modal on Pokémon card click', async () => {
    renderHomePage();
    const bulbasaurCard = screen.getByText(/bulbasaur/i);
    fireEvent.click(bulbasaurCard);

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  });
});
