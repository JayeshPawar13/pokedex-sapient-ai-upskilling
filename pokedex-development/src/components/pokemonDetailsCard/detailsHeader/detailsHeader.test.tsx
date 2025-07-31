import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DetailsHeader from './detailsHeader';
import { PokemonCardData } from '../../pokemonCard/pokemonCard';
import * as pokemonTypes from '../../../constants/pokemon.types';

// Mock subcomponents and assets
jest.mock('../../pokemonCard/pokemonCard', () => (props: any) => (
  <div data-testid="pokemon-card">{props.data.name}</div>
));

jest.mock('../../../hooks/tooltip/tooltip', () => (props: any) => (
  <div data-testid="tooltip">{props.name}</div>
));

// Mock images to avoid import issues
jest.mock('../../../assets/icons/back-icon.png', () => 'back-icon.png');
jest.mock('../../../assets/icons/close-icon.png', () => 'close-icon.png');
jest.mock('../../../assets/icons/right-icon.png', () => 'right-icon.png');

describe('DetailsHeader Component', () => {
  const mockData: PokemonCardData = {
    name: 'bulbasaur',
    id: 1,
    types: [],
    sprites: {
      front_default: '',
    },
  };

  const mockFlavorEntries = [
    {
      flavor_text: 'A strange seed was planted on its back at birth.',
      language: { name: 'en' },
    },
    {
      flavor_text: 'French text.',
      language: { name: 'fr' },
    },
  ];

  beforeEach(() => {
    jest.spyOn(pokemonTypes, 'getPokemonDescription').mockImplementation(() => 'A strange seed was planted on its back at birth. It grows by drawing energy.');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders PokemonCard with correct name', () => {
    render(<DetailsHeader data={mockData} />);
    expect(screen.getByTestId('pokemon-card')).toHaveTextContent('bulbasaur');
  });

  it('shows description text and tooltip when description is long', () => {
    jest.spyOn(pokemonTypes, 'getPokemonDescription').mockReturnValue(
      'A'.repeat(500)
    );

    render(
      <DetailsHeader
        data={mockData}
        speciesData={{ flavor_text_entries: mockFlavorEntries }}
      />
    );

    expect(screen.getByText(/read more/i)).toBeInTheDocument();
  });

  it('does not show tooltip when description is short', () => {
    jest.spyOn(pokemonTypes, 'getPokemonDescription').mockReturnValue('Short text');

    render(
      <DetailsHeader
        data={mockData}
        speciesData={{ flavor_text_entries: mockFlavorEntries }}
      />
    );

    expect(screen.queryByTestId('tooltip')).not.toBeInTheDocument();
  });

  it('calls backClick, closeClick and forwordClick handlers', () => {
    const backClick = jest.fn();
    const closeClick = jest.fn();
    const forwordClick = jest.fn();

    render(
      <DetailsHeader
        data={mockData}
        backClick={backClick}
        closeClick={closeClick}
        forwordClick={forwordClick}
      />
    );

    const icons = screen.getAllByRole('presentation');
    fireEvent.click(icons[0]);
    fireEvent.click(icons[1]);
    fireEvent.click(icons[2]);

    expect(backClick).toHaveBeenCalled();
    expect(closeClick).toHaveBeenCalled();
    expect(forwordClick).toHaveBeenCalled();
  });
});
