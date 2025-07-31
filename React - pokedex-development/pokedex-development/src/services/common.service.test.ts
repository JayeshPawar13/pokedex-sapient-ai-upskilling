import {
  getPokemonData,
  getSpeciesDataById,
  getPokemonTypesById,
  getPokemonTypes,
  getPokemonGenders,
  getPokemonDataById,
  getPokemonDataByURL,
  numberFormation,
  getAllParallelCall,
  removeDuplicateBy,
  initialURL,
  allPokemonURL
} from './common.service';

global.fetch = jest.fn();

describe('common.service', () => {
  const mockJson = jest.fn();
  const mockFetch = fetch as jest.Mock;

  beforeEach(() => {
    mockJson.mockReset();
    mockFetch.mockReset();
    mockFetch.mockResolvedValue({ json: mockJson });
  });

  it('should return data from getPokemonData', async () => {
    mockJson.mockResolvedValue({ results: ['pikachu'] });
    const result = await getPokemonData();
    expect(mockFetch).toHaveBeenCalledWith(initialURL);
    expect(result).toEqual({ results: ['pikachu'] });
  });

  it('should return data from getSpeciesDataById', async () => {
    mockJson.mockResolvedValue({ name: 'pikachu' });
    const result = await getSpeciesDataById(1);
    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('/pokemon-species/1/'));
    expect(result).toEqual({ name: 'pikachu' });
  });

  it('should return data from getPokemonTypesById', async () => {
    mockJson.mockResolvedValue({ type: 'electric' });
    const result = await getPokemonTypesById(25);
    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('/type/25/'));
    expect(result).toEqual({ type: 'electric' });
  });

  it('should return data from getPokemonTypes', async () => {
    mockJson.mockResolvedValue({ results: ['fire', 'water'] });
    const result = await getPokemonTypes();
    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('/type'));
    expect(result).toEqual({ results: ['fire', 'water'] });
  });

  it('should return data from getPokemonGenders', async () => {
    mockJson.mockResolvedValue({ results: ['male', 'female'] });
    const result = await getPokemonGenders();
    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('/gender'));
    expect(result).toEqual({ results: ['male', 'female'] });
  });

  it('should return data from getPokemonDataById', async () => {
    mockJson.mockResolvedValue({ name: 'bulbasaur' });
    const result = await getPokemonDataById(1);
    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('/pokemon/1/'));
    expect(result).toEqual({ name: 'bulbasaur' });
  });

  it('should return data from getPokemonDataByURL', async () => {
    const testUrl = 'https://pokeapi.co/api/v2/pokemon/1/';
    mockJson.mockResolvedValue({ name: 'bulbasaur' });
    const result = await getPokemonDataByURL(testUrl);
    expect(mockFetch).toHaveBeenCalledWith(testUrl);
    expect(result).toEqual({ name: 'bulbasaur' });
  });

  it('should format number properly with numberFormation', () => {
    expect(numberFormation(1)).toBe('001');
    expect(numberFormation(45)).toBe('045');
    expect(numberFormation(123)).toBe(123);
    expect(numberFormation('2')).toBe('002');
  });

  it('should remove duplicates by a given property', () => {
    const input = [
      { name: 'pikachu', url: '1' },
      { name: 'charmander', url: '2' },
      { name: 'pikachu', url: '1' },
    ];
    const result = removeDuplicateBy(input, 'name');
    expect(result).toEqual([
      { name: 'pikachu', url: '1' },
      { name: 'charmander', url: '2' }
    ]);
  });

  it('should fetch all data in parallel with getAllParallelCall', async () => {
    mockJson.mockResolvedValueOnce({ pokemon: 'pikachu' });
    mockJson.mockResolvedValueOnce({ pokemon: 'bulbasaur' });

    mockFetch
      .mockResolvedValueOnce({ json: () => Promise.resolve({ pokemon: 'pikachu' }) })
      .mockResolvedValueOnce({ json: () => Promise.resolve({ pokemon: 'bulbasaur' }) });

    const urls = ['url1', 'url2'];
    const results = await getAllParallelCall(urls);
    expect(results).toEqual([{ pokemon: 'pikachu' }, { pokemon: 'bulbasaur' }]);
    expect(mockFetch).toHaveBeenCalledTimes(2);
  });

  it('should export correct static URLs', () => {
    expect(initialURL).toContain('limit=');
    expect(allPokemonURL).toContain('limit=1100');
  });
});
