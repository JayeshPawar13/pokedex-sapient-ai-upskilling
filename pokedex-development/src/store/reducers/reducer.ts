import React from "react";
import { PokemonCardData } from "../../components/pokemonCard/pokemonCard";

export interface NamedResource {
  name: string;
  url: string;
}

export interface PokemonContextType {
  pokemonsList: PokemonCardData[];
  allPokemonsList: NamedResource[];
  pokemonSelectedId: number | null;
  pokemonData: PokemonCardData | null;
  isLoading: boolean;
  isLoadMoreInprogress: boolean;
  pokemonsTypes: NamedResource[];
  pokemonGenderList: NamedResource[];
  dispatch?: React.Dispatch<PokemonAction>;
  getPokemonData?: (isReset?: boolean) => Promise<void>;
  getPokemonDetailsListByUrl?: (results: NamedResource[]) => Promise<PokemonCardData[]>;
  setAppLoading?: (loading: boolean) => void;
}

const PokemonContext = React.createContext<PokemonContextType>({
  pokemonsList: [],
  allPokemonsList: [],
  pokemonSelectedId: null,
  pokemonData: null,
  isLoading: false,
  isLoadMoreInprogress: false,
  pokemonsTypes: [],
  pokemonGenderList: [],
});

export default PokemonContext;

export const initialState: PokemonState = {
  pokemonsList: [],
  allPokemonsList: [],
  pokemonSelectedId: null,
  pokemonData: null,
  isLoading: true,
  isLoadMoreInprogress: false,
  pokemonsTypes: [],
  pokemonGenderList: [],
};

export interface PokemonState {
  pokemonsList: PokemonCardData[];
  allPokemonsList: NamedResource[];
  pokemonSelectedId: number | null;
  pokemonData: PokemonCardData | null;
  isLoading: boolean;
  isLoadMoreInprogress: boolean;
  pokemonsTypes: NamedResource[];
  pokemonGenderList: NamedResource[];
}

export type PokemonAction =
  | { type: "ACTIONS.SET_POKEMON_LIST"; payload: PokemonCardData[] }
  | { type: "ACTIONS.SET_ALL_POKEMON_LIST"; payload: NamedResource[] }
  | { type: "ACTIONS.SET_FILTERED_POKEMON_LIST"; payload: PokemonCardData[] }
  | { type: "ACTIONS.SET_POKEMON_TYPE"; payload: NamedResource[] }
  | { type: "ACTIONS.SET_POKEMON_GENDER_LIST"; payload: NamedResource[] }
  | { type: "ACTIONS.SET_API_CALL_INPROGRESS"; payload: boolean }
  | { type: "ACTIONS.SET_LOAD_MORE_API_CALL_INPROGRESS"; payload: boolean }
  | { type: "ACTIONS.SET_POKEMON_BY_ID"; payload: PokemonCardData }
  | { type: "ACTIONS.RESET_POKEMON_DATA" }
  | { type: "ACTIONS.SET_POKEMON_ID"; payload: number | null };

export const reducer = (
  state: PokemonState,
  action: PokemonAction
): PokemonState => {
  switch (action.type) {
    case "ACTIONS.SET_POKEMON_LIST":
      return {
        ...state,
        pokemonsList: [...state.pokemonsList, ...action.payload],
      };
    case "ACTIONS.SET_ALL_POKEMON_LIST":
      return {
        ...state,
        allPokemonsList: action.payload,
      };
    case "ACTIONS.SET_FILTERED_POKEMON_LIST":
      return {
        ...state,
        pokemonsList: action.payload,
      };
    case "ACTIONS.SET_POKEMON_TYPE":
      return {
        ...state,
        pokemonsTypes: action.payload,
      };
    case "ACTIONS.SET_POKEMON_GENDER_LIST":
      return {
        ...state,
        pokemonGenderList: action.payload,
      };
    case "ACTIONS.SET_API_CALL_INPROGRESS":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "ACTIONS.SET_LOAD_MORE_API_CALL_INPROGRESS":
      return {
        ...state,
        isLoadMoreInprogress: action.payload,
      };
    case "ACTIONS.SET_POKEMON_BY_ID":
      return {
        ...state,
        pokemonData: action.payload,
      };
    case "ACTIONS.RESET_POKEMON_DATA":
      return {
        ...state,
        pokemonData: null,
      };
    case "ACTIONS.SET_POKEMON_ID":
      return {
        ...state,
        pokemonSelectedId: action.payload,
      };
    default:
      return state;
  }
};
