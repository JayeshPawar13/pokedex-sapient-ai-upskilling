import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchFilter, { SearchFilterProps } from './search.filter';

describe('SearchFilter Component', () => {
  const mockProps: SearchFilterProps = {
    placeholder: 'Search Pokémon',
    label: 'Search',
    onChangeHandler: jest.fn(),
    inputClass: 'search-input'
  };

  it('renders with label and placeholder', () => {
    render(<SearchFilter {...mockProps} />);
    expect(screen.getByText('Search')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search Pokémon')).toBeInTheDocument();
  });

  it('applies the inputClass to the input field', () => {
    render(<SearchFilter {...mockProps} />);
    const input = screen.getByPlaceholderText('Search Pokémon');
    expect(input).toHaveClass('search-input');
  });

  it('calls onChangeHandler when user types', () => {
    render(<SearchFilter {...mockProps} />);
    const input = screen.getByPlaceholderText('Search Pokémon');
    fireEvent.change(input, { target: { value: 'Pikachu' } });
    expect(mockProps.onChangeHandler).toHaveBeenCalledWith('Pikachu', expect.anything());
  });

  it('renders the search icon button', () => {
    render(<SearchFilter {...mockProps} />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });
});
