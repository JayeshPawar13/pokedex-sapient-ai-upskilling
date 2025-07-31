import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PokemonContext from '../../context/pokemonContext/pokemon.context';
import HomePage from './home.page';

// Mocks
const mockGetPokemonData = jest.fn();
const mockPokemonList = [
  { id: 1, name: 'bulbasaur', sprites: {}, types: [] },
  { id: 2, name: 'ivysaur', sprites: {}, types: [] },
];

const mockContext = {
  state: {
    pokemonsList: mockPokemonList,
    allPokemonsList: [],           // Add empty array or mock data
    pokemonSelectedId: null,       // or a number if needed
    pokemonData: {},               // or null or appropriate initial value
    pokemonsTypes: [],             // empty array or mock types
    pokemonGenderList: [],         // empty array or mock data
    isLoading: false,
    isLoadMoreInprogress: false,
  },
  getPokemonData: mockGetPokemonData,
};


const renderHomePage = () => {
  render(
    <PokemonContext.Provider value={mockContext}>
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
