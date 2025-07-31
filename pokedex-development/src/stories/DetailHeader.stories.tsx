import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { PokemonCardData } from '../components/pokemonCard/pokemonCard';
import DetailsHeader from '../components/pokemonDetailsCard/detailsHeader/detailsHeader';


const meta: Meta<typeof DetailsHeader> = {
  title: 'Components/DetailsHeader',
  component: DetailsHeader,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DetailsHeader>;

// Sample mock Pokémon data
const mockData: PokemonCardData = {
  name: 'pikachu',
  id: 25,
  types: [
    {
      type: { name: 'electric' },
    },
  ],
  sprites: {
    front_default:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
    other: {
      dream_world: {
        front_default:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg',
      },
    },
  },
  stats: [
    {
      base_stat: 55,
      stat: { name: 'attack' },
    },
  ],
};

const mockSpeciesData = {
  flavor_text_entries: [
    {
      flavor_text:
        'When several of these POKéMON gather, their electricity could build and cause lightning storms.',
      language: { name: 'en' },
    },
  ],
};

export const Default: Story = {
  args: {
    data: mockData,
    speciesData: mockSpeciesData,
    backClick: () => alert('Back clicked'),
    closeClick: () => alert('Close clicked'),
    forwordClick: () => alert('Forward clicked'),
  },
};
