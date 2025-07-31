import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5'; // Or @storybook/react-vite if using Vite
import Apploader from '../components/loader/loader';

const meta: Meta<typeof Apploader> = {
  title: 'Components/Apploader',
  component: Apploader,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Apploader>;

export const Default: Story = {
  args: {
    className: 'loader-wrapper', // Optional: replace with a real class
  },
};
