import React, {
  useReducer,
  useEffect,
  useRef,
  ReactNode,
  Dispatch,
} from 'react';
import { initialState, reducer, PokemonState, PokemonAction } from '../../store/reducers/reducer';
import PokemonContext from './pokemon.context';
import { allPokemonURL, initialURL } from '../../services/common.service';

interface ProviderProps {
  children: ReactNode;
}

export interface Pokemon {
  name: string;
  url: string;
  [key: string]: unknown;
}

export interface PokemonContextType {
  state: PokemonState;
  dispatch: Dispatch<PokemonAction>;
  getPokemonData: (isReset?: boolean) => Promise<void>;
  getPokemonDetailsListByUrl: (results: Pokemon[]) => Promise<unknown[]>;
  setAppLoading: (loading: boolean) => void;
}

const PokemonProvider: React.FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const batchURL = useRef<string | null>(initialURL);

  const setAppLoading = (loading: boolean) => {
    dispatch({
      type: 'ACTIONS.SET_API_CALL_INPROGRESS',
      payload: loading,
    });
  };

  const setLoadMoreDataInprogress = (loading: boolean) => {
    dispatch({
      type: 'ACTIONS.SET_LOAD_MORE_API_CALL_INPROGRESS',
      payload: loading,
    });
  };

  const getPokemonData = async (isReset = false): Promise<void> => {
    if (isReset) {
      batchURL.current = initialURL;
    }

    if (!batchURL.current) return;

    setLoadMoreDataInprogress(true);

    const resp = await fetch(batchURL.current);
    const { next, results }: { next: string; results: Pokemon[] } = await resp.json();

    batchURL.current = next;
    const pokemonsList = await getPokemonDetailsListByUrl(results);
    setPokemonList(pokemonsList);

    setLoadMoreDataInprogress(false);
  };

  const getPokemonDetailsListByUrl = async (results: Pokemon[]): Promise<unknown[]> => {
    const pokemonsDetailsList = await Promise.all(
      results.map(async (pokemon) => {
        const response = await fetch(pokemon.url);
        return response.json();
      })
    );
    return pokemonsDetailsList;
  };

  const getAllPokemonDataList = async (): Promise<void> => {
    const resp = await fetch(allPokemonURL);
    const { results }: { results: Pokemon[] } = await resp.json();
    dispatch({
      type: 'ACTIONS.SET_ALL_POKEMON_LIST',
      payload: results,
    });
  };

  const setPokemonList = (pokemonsList: unknown[]): void => {
    dispatch({
      type: 'ACTIONS.SET_POKEMON_LIST',
      payload: pokemonsList as PokemonState['pokemonsList'],
    });
  };

  useEffect(() => {
    getPokemonData().then(() => {
      if (state.isLoading) setAppLoading(false);
    });
    getAllPokemonDataList();
  }, []);

  return (
    <PokemonContext.Provider
      value={{
        state,
        dispatch,
        getPokemonData,
        getPokemonDetailsListByUrl,
        setAppLoading,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export default PokemonProvider;
