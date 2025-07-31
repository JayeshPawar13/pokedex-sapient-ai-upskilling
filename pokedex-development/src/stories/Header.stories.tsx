import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import Header from '../components/header/header';

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    children: <h1>Welcome to the Pokedex</h1>,
  },
};

export const WithMultipleElements: Story = {
  args: {
    children: (
      <>
        <h1>Pokedex App</h1>
        <p>Catch them all!</p>
      </>
    ),
  },
};
