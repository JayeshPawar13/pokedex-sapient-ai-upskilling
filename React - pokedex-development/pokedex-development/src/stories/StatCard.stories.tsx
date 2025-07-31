import type { Meta, StoryObj } from '@storybook/react-webpack5';
import StatCard from '../components/pokemonDetailsCard/statCard/statCard';

const meta: Meta<typeof StatCard> = {
  title: 'Components/StatCard',
  component: StatCard,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof StatCard>;

// ✅ Mock stats matching expected structure
const mockStats = [
  {
    base_stat: 45,
    stat: { name: 'hp' },
  },
  {
    base_stat: 49,
    stat: { name: 'attack' },
  },
  {
    base_stat: 49,
    stat: { name: 'defense' },
  },
  {
    base_stat: 65,
    stat: { name: 'special-attack' },
  },
  {
    base_stat: 65,
    stat: { name: 'special-defense' },
  },
  {
    base_stat: 45,
    stat: { name: 'speed' },
  },
];

export const Default: Story = {
  args: {
    stats: mockStats,
  },
};
