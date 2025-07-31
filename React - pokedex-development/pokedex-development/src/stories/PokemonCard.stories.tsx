import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5'; // or react-vite
import PokemonCard from '../components/pokemonCard/pokemonCard';


const meta: Meta<typeof PokemonCard> = {
    title: 'Components/PokemonCard',
    component: PokemonCard,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PokemonCard>;

export const Default: Story = {
    args: {
        data: {
            name: 'pikachu',
            id: 25,
            types: [
                {
                    type: { name: 'electric' },

                },
            ],
            sprites: {
                other: {
                    dream_world: {
                        front_default:
                            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg',
                    },
                },
                front_default:
                    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
            },
        },
    },
};
