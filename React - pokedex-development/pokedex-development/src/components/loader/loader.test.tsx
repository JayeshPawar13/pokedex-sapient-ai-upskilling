import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Apploader from './loader';

describe('Apploader Component', () => {
  it('renders the loader with text "Loading..."', () => {
    render(<Apploader />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});
