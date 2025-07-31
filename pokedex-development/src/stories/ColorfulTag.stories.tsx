import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5'; // or '@storybook/react-vite'
import ColorfulTag from '../components/pokemonDetailsCard/colorfulTags/colorfulTag';

const meta: Meta<typeof ColorfulTag> = {
  title: 'Components/ColorfulTag',
  component: ColorfulTag,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ColorfulTag>;

export const Electric: Story = {
  args: {
    text: 'Electric',
    type: 'electric',
    className: '',
  },
};

export const Fire: Story = {
  args: {
    text: 'Fire',
    type: 'fire',
    className: '',
  },
};

export const Grass: Story = {
  args: {
    text: 'Grass',
    type: 'grass',
    className: '',
  },
};
