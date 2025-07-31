import {
  POKEMON_TYPE,
  getPokcolor,
  getBackground,
  getPokemonDescription,
  getCamleCaseString,
  PokemonType,
  PokemonFlavorText
} from './pokemon.types';

describe('pokemon.types utilities', () => {
  describe('getPokcolor', () => {
    it('returns correct color for known type', () => {
      expect(getPokcolor('fire')).toBe(POKEMON_TYPE.fire.color);
    });

    it('returns unknown color for unknown type', () => {
      expect(getPokcolor('nonexistent' as any)).toBe(POKEMON_TYPE.unknown.color);
    });
  });

  describe('getBackground', () => {
    it('returns gradient for two types', () => {
      const types: PokemonType[] = [
        { type: { name: 'fire' } },
        { type: { name: 'water' } },
      ];
      const background = getBackground(types);
      expect(background).toBe(
        `linear-gradient(180deg, ${POKEMON_TYPE.fire.color} 0%, ${POKEMON_TYPE.water.color} 100%)`
      );
    });

    it('returns solid color for one type', () => {
      const types: PokemonType[] = [
        { type: { name: 'grass' } },
      ];
      expect(getBackground(types)).toBe(POKEMON_TYPE.grass.color);
    });

    it('returns empty string for empty types', () => {
      expect(getBackground([])).toBe('');
      expect(getBackground(undefined as any)).toBe('');
    });
  });

  describe('getPokemonDescription', () => {
    it('returns combined unique English flavor texts', () => {
      const data: PokemonFlavorText[] = [
        {
          language: { name: 'en' },
          flavor_text: 'First\nline.',
        },
        {
          language: { name: 'en' },
          flavor_text: 'Second\fline.',
        },
        {
          language: { name: 'jp' },
          flavor_text: 'Japanese line.',
        },
        {
          language: { name: 'en' },
          flavor_text: 'First\nline.', // duplicate
        },
      ];
      const description = getPokemonDescription(data);
      expect(description).toBe('First line.Second line.');
    });

    it('returns empty string for no data', () => {
      expect(getPokemonDescription([])).toBe('');
      expect(getPokemonDescription(undefined as any)).toBe('');
    });
  });

  describe('getCamleCaseString', () => {
    it('capitalizes the first letter of string', () => {
      expect(getCamleCaseString('fire')).toBe('Fire');
    });

    it('returns empty string for undefined or empty input', () => {
      expect(getCamleCaseString()).toBe('');
      expect(getCamleCaseString('')).toBe('');
    });
  });
});
