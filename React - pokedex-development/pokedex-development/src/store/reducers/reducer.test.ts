import { initialState, PokemonAction, PokemonState, reducer } from "./reducer";


describe('Pokemon Reducer', () => {
  it('should set pokemons list', () => {
    const action: PokemonAction = {
      type: 'ACTIONS.SET_POKEMON_LIST',
      payload: [{ name: 'Pikachu', id: 25, types: [], sprites: {} }],
    };
    const result = reducer(initialState, action);
    expect(result.pokemonsList).toEqual([{ name: 'Pikachu' }]);
  });


  it('should set filtered pokemons list', () => {
    const action: PokemonAction = {
      type: 'ACTIONS.SET_FILTERED_POKEMON_LIST',
      payload: [{ name: 'Charmander', id: 4, types: [], sprites: {} }],
    };
    const result = reducer(initialState, action);
    expect(result.pokemonsList).toEqual([{ name: 'Charmander' }]);
  });

  it('should toggle loading state', () => {
    const action: PokemonAction = {
      type: 'ACTIONS.SET_API_CALL_INPROGRESS',
      payload: true,
    };
    const result = reducer(initialState, action);
    expect(result.isLoading).toBe(true);
  });

  it('should reset pokemon data', () => {
    const modifiedState: PokemonState = {
      ...initialState,
      pokemonData: { name: 'Mew',id: 151, types: [], sprites: {}   },
    };
    const action: PokemonAction = {
      type: 'ACTIONS.RESET_POKEMON_DATA',
    };
    const result = reducer(modifiedState, action);
    expect(result.pokemonData).toBeNull();
  });
});
