import React, {
  useReducer,
  useEffect,
  useRef,
  ReactNode,
  Dispatch,
  useCallback,
} from 'react';
import {
  initialState,
  reducer,
  PokemonState,
  PokemonAction,
} from '../../store/reducers/reducer';
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

const PokemonProvider: React.FC<ProviderProps> = ({ children }): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const batchURL = useRef<string | null>(initialURL);

  const setAppLoading = useCallback((loading: boolean): void => {
    dispatch({
      type: 'ACTIONS.SET_API_CALL_INPROGRESS',
      payload: loading,
    });
  }, []);

  const setLoadMoreDataInprogress = useCallback((loading: boolean): void => {
    dispatch({
      type: 'ACTIONS.SET_LOAD_MORE_API_CALL_INPROGRESS',
      payload: loading,
    });
  }, []);

  const getPokemonDetailsListByUrl = useCallback(
    async (results: Pokemon[]): Promise<unknown[]> => {
      try {
        const pokemonsDetailsList = await Promise.all(
          results.map(async (pokemon) => {
            const response = await fetch(pokemon.url);
            if (!response.ok) {
              throw new Error(`Failed to fetch details for ${pokemon.name}`);
            }
            return response.json();
          })
        );
        return pokemonsDetailsList;
      } catch (error) {
        // Handle or log error as needed
        console.error(error);
        return [];
      }
    },
    []
  );

  const setPokemonList = useCallback((pokemonsList: unknown[]): void => {
    dispatch({
      type: 'ACTIONS.SET_POKEMON_LIST',
      payload: pokemonsList as PokemonState['pokemonsList'],
    });
  }, []);

  const getPokemonData = useCallback(
    async (isReset = false): Promise<void> => {
      if (isReset) {
        batchURL.current = initialURL;
      }

      if (!batchURL.current) return;

      setLoadMoreDataInprogress(true);

      try {
        const resp = await fetch(batchURL.current);
        if (!resp.ok) {
          throw new Error('Failed to fetch Pokemon data');
        }

        const { next, results }: { next: string; results: Pokemon[] } =
          await resp.json();

        batchURL.current = next;

        const pokemonsList = await getPokemonDetailsListByUrl(results);
        setPokemonList(pokemonsList);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadMoreDataInprogress(false);
      }
    },
    [getPokemonDetailsListByUrl, setLoadMoreDataInprogress, setPokemonList]
  );

  const getAllPokemonDataList = useCallback(async (): Promise<void> => {
    try {
      const resp = await fetch(allPokemonURL);
      if (!resp.ok) {
        throw new Error('Failed to fetch all Pokemon list');
      }
      const { results }: { results: Pokemon[] } = await resp.json();
      dispatch({
        type: 'ACTIONS.SET_ALL_POKEMON_LIST',
        payload: results,
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    void getPokemonData().then(() => {
      if (state.isLoading) setAppLoading(false);
    });
    void getAllPokemonDataList();
  }, [getPokemonData, getAllPokemonDataList, setAppLoading, state.isLoading]);

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
