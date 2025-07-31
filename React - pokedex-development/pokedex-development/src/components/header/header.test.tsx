import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './header';

describe('Header Component', () => {
  it('renders without crashing', () => {
    render(<Header />);
    const header = screen.getByRole('banner'); // <header> gets role="banner"
    expect(header).toBeInTheDocument();
  });

  it('renders children inside header', () => {
    render(
      <Header>
        <div>Test Child</div>
      </Header>
    );
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  it('applies header class', () => {
    render(<Header />);
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('header');
  });
});
