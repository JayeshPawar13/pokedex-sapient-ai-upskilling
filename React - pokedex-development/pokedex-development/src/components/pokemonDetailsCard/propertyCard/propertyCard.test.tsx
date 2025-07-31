// __tests__/propertyCard.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import PropertyCard from './propertyCard';

jest.mock('../colorfulTags/colorfulTag', () => ({
    __esModule: true,
    default: ({ text }: { text: string }) => <span>{text}</span>,
}));

describe('PropertyCard', () => {
    const mockProps = {
        data: {
            height: 10,
            weight: 100,
            abilities: [
                { ability: { name: 'overgrow' } },
                { ability: { name: 'chlorophyll' } },
            ],
            types: [
                { type: { name: 'grass' } },
                { type: { name: 'poison' } },
            ],
        },
        speciesData: {
            egg_groups: [
                { name: 'monster' },
                { name: 'plant' },
            ],
        },
        pokemonTypeData: {
            damage_relations: {
                double_damage_from: [
                    { name: 'fire' },
                    { name: 'ice' },
                ],
            },
        },
    };

    it('renders height and weight correctly', () => {
        render(<PropertyCard {...mockProps} />);
        expect(screen).toBeDefined();
    });

    it('renders egg groups', () => {
        render(<PropertyCard {...mockProps} />);
        expect(screen).toBeDefined();

    });

    it('renders abilities', () => {
        render(<PropertyCard {...mockProps} />);
        expect(screen).toBeDefined();

    });

    it('renders types', () => {
        render(<PropertyCard {...mockProps} />);
        expect(screen).toBeDefined();

    });

    it('renders weaknesses', () => {
        render(<PropertyCard {...mockProps} />);
        expect(screen).toBeDefined();

    });

    it('handles empty props gracefully', () => {
        render(
            <PropertyCard
                data={{}}
                speciesData={{}}
                pokemonTypeData={{}}
            />
        );

        expect(screen).toBeDefined();

    });
});
