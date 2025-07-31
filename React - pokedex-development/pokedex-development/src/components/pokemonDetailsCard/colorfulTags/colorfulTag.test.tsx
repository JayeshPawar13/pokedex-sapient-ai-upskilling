import React from 'react';
import { render, screen } from '@testing-library/react';
import { POKEMON_TYPE } from '../../../constants/pokemon.types';
import * as typeUtils from '../../../constants/pokemon.types'; // for mocking getPokcolor
import ColorfulTag from './colorfulTag';

describe('ColorfulTag Component', () => {
  const mockColor = '#abcdef';

  beforeEach(() => {
    jest.spyOn(typeUtils, 'getPokcolor').mockReturnValue(mockColor);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders with correct text', () => {
    render(<ColorfulTag text="Fire" type="fire" />);
    expect(screen.getByText('Fire')).toBeInTheDocument();
  });

  it('applies background color returned from getPokcolor', () => {
    render(<ColorfulTag text="Water" type="water" />);
    const tag = screen.getByText('Water');
    expect(tag).toHaveStyle(`background: ${mockColor}`);
  });

  it('applies custom className if provided', () => {
    render(<ColorfulTag text="Grass" type="grass" className="custom-class" />);
    const wrapper = screen.getByText('Grass').parentElement;
    expect(wrapper).toHaveClass('custom-class');
  });
});
