import type { Meta, StoryObj } from '@storybook/react-webpack5';
import PropertyCard from '../components/pokemonDetailsCard/propertyCard/propertyCard';

const meta: Meta<typeof PropertyCard> = {
  title: 'Components/PropertyCard',
  component: PropertyCard,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PropertyCard>;

// Sample mock data
const mockData = {
  height: 7,
  weight: 69,
  abilities: [
    { ability: { name: 'overgrow' } },
    { ability: { name: 'chlorophyll' } },
  ],
  types: [
    {
      type: { name: 'grass' },
    },
    {
      type: { name: 'poison' },
    },
  ],
};

const mockSpeciesData = {
  egg_groups: [
    { name: 'monster' },
    { name: 'plant' },
  ],
};

const mockPokemonTypeData = {
  damage_relations: {
    double_damage_from: [
      { name: 'fire' },
      { name: 'ice' },
      { name: 'flying' },
      { name: 'psychic' },
    ],
  },
};

export const Default: Story = {
  args: {
    data: mockData,
    speciesData: mockSpeciesData,
    pokemonTypeData: mockPokemonTypeData,
  },
};
