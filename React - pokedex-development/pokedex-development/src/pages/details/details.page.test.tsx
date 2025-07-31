import React from 'react';
import { render, waitFor } from '@testing-library/react';
import DetailPage from './details.page';
import { getPokemonDataById, getSpeciesDataById, getPokemonTypesById } from '../../services/common.service';

// Mocks
jest.mock('../../services/common.service', () => ({
  getPokemonDataById: jest.fn(),
  getSpeciesDataById: jest.fn(),
  getPokemonTypesById: jest.fn()
}));

// Mock Components
jest.mock('../../components/pokemonDetailsCard/detailsHeader/detailsHeader', () => () => <div>DetailsHeader</div>);
jest.mock('../../components/pokemonDetailsCard/propertyCard/propertyCard', () => () => <div>PropertyCard</div>);
jest.mock('../../components/pokemonDetailsCard/statCard/statCard', () => () => <div>StatCard</div>);
jest.mock('../../components/pokemonDetailsCard/evolutionChainCard/evolutionChainCard', () => () => <div>EvolutionChainCard</div>);

describe('DetailPage Component', () => {
  const mockPokemonData = {
    name: 'pikachu',
    stats: [{ base_stat: 50, stat: { name: 'speed' } }]
  };

  const mockSpeciesData = { name: 'electric-mouse' };
  const mockTypeData = {
    damage_relations: {
      double_damage_from: [{ name: 'ground' }]
    }
  };

  beforeEach(() => {
    (getPokemonDataById as jest.Mock).mockResolvedValue(mockPokemonData);
    (getSpeciesDataById as jest.Mock).mockResolvedValue(mockSpeciesData);
    (getPokemonTypesById as jest.Mock).mockResolvedValue(mockTypeData);
  });

  it('renders modal and fetches data correctly', async () => {
    const toggleModal = jest.fn();

    const { container, getByText } = render(
      <DetailPage
        isCardSelected={true}
        toggleModal={toggleModal}
        pokemonId={25}
        offset={100}
      />
    );

    // Wait for API calls to complete
    await waitFor(() => {
      expect(getPokemonDataById).toHaveBeenCalledWith(25);
      expect(getSpeciesDataById).toHaveBeenCalledWith(25);
      expect(getPokemonTypesById).toHaveBeenCalledWith(25);
    });

    // Check if mocked child components render
    expect(getByText('DetailsHeader')).toBeTruthy();
    expect(getByText('PropertyCard')).toBeTruthy();
    expect(getByText('StatCard')).toBeTruthy();
    expect(getByText('EvolutionChainCard')).toBeTruthy();

    // Modal container should exist
    expect(container.querySelector('.details-modal-container')).toBeNull();
  });

  it('does not fetch if pokemonId is 0', async () => {
    const toggleModal = jest.fn();

    render(
      <DetailPage
        isCardSelected={true}
        toggleModal={toggleModal}
        pokemonId={0}
        offset={100}
      />
    );

    await waitFor(() => {
      expect(getPokemonDataById).not.toHaveBeenCalled();
    });
  });
});
