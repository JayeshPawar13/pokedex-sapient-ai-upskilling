import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { PokemonCardData } from '../components/pokemonCard/pokemonCard';
import EvolutionChainCard from '../components/pokemonDetailsCard/evolutionChainCard/evolutionChainCard';

const meta: Meta<typeof EvolutionChainCard> = {
  title: 'Components/EvolutionChainCard',
  component: EvolutionChainCard,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof EvolutionChainCard>;

// Mock data for a single Pokémon
const mockPokemon: PokemonCardData = {
  name: 'bulbasaur',
  id: 1,
  types: [
    {
      type: { name: 'grass' },
    },
  ],
  sprites: {
    front_default:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    other: {
      dream_world: {
        front_default:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg',
      },
    },
  },
  stats: [
    {
      base_stat: 45,
      stat: { name: 'hp' },
    },
  ],
};

export const Default: Story = {
  args: {
    data: mockPokemon,
  },
};
