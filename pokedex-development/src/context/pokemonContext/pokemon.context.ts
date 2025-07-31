
import { createContext } from "react";
import { initialState, PokemonState } from "../../store/reducers/reducer";

export interface PokemonContextType {
  state: PokemonState;
  dispatch: React.Dispatch<any>;
  getPokemonData: (isReset?: boolean) => Promise<void>;
  getPokemonDetailsListByUrl: (results: any[]) => Promise<any[]>;
  setAppLoading: (loading: boolean) => void;
}

const PokemonContext = createContext<Partial<PokemonContextType>>(initialState as any);
export default PokemonContext;
