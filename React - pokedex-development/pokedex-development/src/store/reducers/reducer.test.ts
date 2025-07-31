import {
  reducer,
  initialState,
  PokemonAction,
  PokemonState,
} from './reducer';

describe('Pokemon Reducer', () => {
  it('should append pokemons to pokemonsList', () => {
    const action: PokemonAction = {
      type: 'ACTIONS.SET_POKEMON_LIST',
      payload: [{ name: 'Pikachu' }],
    };
    const result = reducer(initialState, action);
    expect(result.pokemonsList).toEqual([{ name: 'Pikachu' }]);
  });

  it('should set allPokemonsList', () => {
    const action: PokemonAction = {
      type: 'ACTIONS.SET_ALL_POKEMON_LIST',
      payload: [{ name: 'Charmander' }],
    };
    const result = reducer(initialState, action);
    expect(result.allPokemonsList).toEqual([{ name: 'Charmander' }]);
  });

  it('should replace pokemonsList with filtered list', () => {
    const action: PokemonAction = {
      type: 'ACTIONS.SET_FILTERED_POKEMON_LIST',
      payload: [{ name: 'Squirtle' }],
    };
    const result = reducer(initialState, action);
    expect(result.pokemonsList).toEqual([{ name: 'Squirtle' }]);
  });

  it('should set pokemonsTypes', () => {
    const action: PokemonAction = {
      type: 'ACTIONS.SET_POKEMON_TYPE',
      payload: ['fire', 'water'],
    };
    const result = reducer(initialState, action);
    expect(result.pokemonsTypes).toEqual(['fire', 'water']);
  });

  it('should set pokemonGenderList', () => {
    const action: PokemonAction = {
      type: 'ACTIONS.SET_POKEMON_GENDER_LIST',
      payload: ['male', 'female'],
    };
    const result = reducer(initialState, action);
    expect(result.pokemonGenderList).toEqual(['male', 'female']);
  });

  it('should set isLoading', () => {
    const action: PokemonAction = {
      type: 'ACTIONS.SET_API_CALL_INPROGRESS',
      payload: false,
    };
    const result = reducer(initialState, action);
    expect(result.isLoading).toBe(false);
  });

  it('should set isLoadMoreInprogress', () => {
    const action: PokemonAction = {
      type: 'ACTIONS.SET_LOAD_MORE_API_CALL_INPROGRESS',
      payload: true,
    };
    const result = reducer(initialState, action);
    expect(result.isLoadMoreInprogress).toBe(true);
  });

  it('should set pokemonData', () => {
    const action: PokemonAction = {
      type: 'ACTIONS.SET_POKEMON_BY_ID',
      payload: { name: 'Mewtwo' },
    };
    const result = reducer(initialState, action);
    expect(result.pokemonData).toEqual({ name: 'Mewtwo' });
  });

  it('should reset pokemonData to null', () => {
    const customState: PokemonState = {
      ...initialState,
      pokemonData: { name: 'Mew' },
    };
    const action: PokemonAction = {
      type: 'ACTIONS.RESET_POKEMON_DATA',
    };
    const result = reducer(customState, action);
    expect(result.pokemonData).toBeNull();
  });

  it('should set pokemonSelectedId', () => {
    const action: PokemonAction = {
      type: 'ACTIONS.SET_POKEMON_ID',
      payload: 42,
    };
    const result = reducer(initialState, action);
    expect(result.pokemonSelectedId).toBe(42);
  });

  it('should return same state on unknown action type', () => {
    const action = { type: 'UNKNOWN_ACTION' } as any;
    const result = reducer(initialState, action);
    expect(result).toEqual(initialState);
  });
});
