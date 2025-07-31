// File: src/hooks/tooltip/tooltip.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AppTooltip from './tooltip';

describe('AppTooltip', () => {
  const tooltipText = 'This is tooltip content';

  it('renders the trigger element with the correct text', () => {
    render(
      <AppTooltip
        placement="top"
        data={tooltipText}
        name="Hover me"
        className="tooltip-trigger"
        tooltipClass="custom-tooltip"
      />
    );

    expect(screen.getByText('Hover me')).toBeInTheDocument();
  });

  it('displays tooltip content on click', async () => {
    render(
      <AppTooltip
        placement="top"
        data={tooltipText}
        name="Click me"
        className="tooltip-trigger"
        tooltipClass="custom-tooltip"
      />
    );

    const trigger = screen.getByText('Click me');
    fireEvent.click(trigger);

    expect(await screen.findByText(tooltipText)).toBeInTheDocument();
  });

  it('applies custom class to tooltip', async () => {
    render(
      <AppTooltip
        placement="top"
        data={tooltipText}
        name="Check class"
        tooltipClass="custom-tooltip-class"
      />
    );

    const trigger = screen.getByText('Check class');
    fireEvent.click(trigger);

    const tooltip = await screen.findByText(tooltipText);
    expect(tooltip.closest('.custom-tooltip-class')).toBeInTheDocument();
  });

  it('renders without optional props', () => {
    render(
      <AppTooltip
        placement="top"
        data="Minimal setup"
      />
    );

    expect(screen).toBeDefined();
  });
});
