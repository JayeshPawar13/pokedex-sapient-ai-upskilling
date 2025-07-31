import React from 'react';
import { render, screen } from '@testing-library/react';
import StatCard from './statCard';

// Mocked data for stats
const mockStats = [
  {
    base_stat: 45,
    stat: { name: 'hp' },
  },
  {
    base_stat: 60,
    stat: { name: 'attack' },
  },
  {
    base_stat: 50,
    stat: { name: 'special-attack' },
  },
];

describe('StatCard Component', () => {
  it('renders heading "Stats"', () => {
    render(<StatCard stats={mockStats} />);
    expect(screen.getByText('Stats')).toBeInTheDocument();
  });

  it('renders progress bars with correct values', () => {
    render(<StatCard stats={mockStats} />);
    const progressBars = screen.getAllByRole('progressbar');
    expect(progressBars).toHaveLength(3);
    expect(progressBars[0]).toHaveAttribute('value', '45');
    expect(progressBars[1]).toHaveAttribute('value', '60');
    expect(progressBars[2]).toHaveAttribute('value', '50');
  });
});
