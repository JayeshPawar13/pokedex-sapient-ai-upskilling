import * as ACTIONS from './pokemonAction';

describe('pokemonAction constants', () => {
  it('should have correct action constants', () => {
    expect(ACTIONS.GET_POKEMON_LIST).toBe('GET_POKEMON_LIST');
    expect(ACTIONS.SET_POKEMON_LIST).toBe('SET_POKEMON_LIST');
    expect(ACTIONS.SET_ALL_POKEMON_LIST).toBe('SET_ALL_POKEMON_LIST');
    expect(ACTIONS.GET_POKEMON_BY_ID).toBe('GET_POKEMON_BY_ID');
    expect(ACTIONS.SET_POKEMON_BY_ID).toBe('SET_POKEMON_BY_ID');
    expect(ACTIONS.SET_POKEMON_ID).toBe('SET_POKEMON_ID');
    expect(ACTIONS.RESET_POKEMON_DATA).toBe('RESET_POKEMON_DATA');
    expect(ACTIONS.SET_API_CALL_INPROGRESS).toBe('API_CALL_INPROGRESS');
  });
});
