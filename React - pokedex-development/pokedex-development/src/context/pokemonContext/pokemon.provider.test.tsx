import React from "react";
import { render, waitFor, act } from "@testing-library/react";
import PokemonProvider from "./pokemon.provider";
import PokemonContext from "./pokemon.context";

jest.mock("../../services/common.service", () => ({
  allPokemonURL: "https://mockapi.com/all-pokemon",
  initialURL: "https://mockapi.com/pokemon",
}));

const mockPokemonList = [
  { name: "pikachu", url: "https://pokeapi.co/api/v2/pokemon/25/" },
];

const mockPokemonDetails = [
  { name: "bulbasaur" },
];

const mockAllPokemonList = {
  results: [
    { name: "pikachu", url: "https://pokeapi.co/api/v2/pokemon/25/" },
  ],
};

global.fetch = jest.fn();

describe("PokemonProvider", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (fetch as jest.Mock)
      // useEffect: getPokemonData
      .mockResolvedValueOnce({
        json: async () => ({
          next: null,
          results: mockPokemonList,
        }),
      })
      // useEffect: getPokemonDetailsListByUrl
      .mockResolvedValueOnce({
        json: async () => mockPokemonDetails[0],
      })
      // useEffect: getAllPokemonDataList
      .mockResolvedValueOnce({
        json: async () => mockAllPokemonList,
      });
  });

  it("fetches and sets pokemon data on mount", async () => {
    let context: any;
    const TestComponent = () => {
      context = React.useContext(PokemonContext);
      return <div>Test</div>;
    };

    await act(async () => {
      render(
        <PokemonProvider>
          <TestComponent />
        </PokemonProvider>
      );
    });

    await waitFor(() => {
      expect(context.state.pokemonsList).toBeDefined();
    });
  });

  it("resets URL and fetches fresh data if isReset is true", async () => {
    let context: any;
    const TestComponent = () => {
      context = React.useContext(PokemonContext);
      return <div>Test</div>;
    };

    await act(async () => {
      render(
        <PokemonProvider>
          <TestComponent />
        </PokemonProvider>
      );
    });

    // Mocks for second fetch (reset)
    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        json: async () => ({
          next: null,
          results: mockPokemonList,
        }),
      })
      .mockResolvedValueOnce({
        json: async () => mockPokemonDetails[0],
      });

    await act(async () => {
      await context.getPokemonData(true);
    });

    expect(context.state.pokemonsList).toBeDefined();
  });
});
