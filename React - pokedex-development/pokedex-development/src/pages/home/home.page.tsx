import React, { useContext, useMemo, useState, useCallback } from 'react';
import Header from '../../components/header/header';
import './home.scss';
import '../../styles/common.scss';
import PokemonCard, { PokemonCardData } from '../../components/pokemonCard/pokemonCard';
import Apploader from '../../components/loader/loader';
import PokemonContext from '../../context/pokemonContext/pokemon.context';
import DetailPage from '../details/details.page';
import { Button, Col, Row } from 'rsuite';
import AppFilter from '../../components/filter/filter';

interface PokemonContextType {
  state: {
    pokemonsList: PokemonCardData[];
    isLoading: boolean;
    isLoadMoreInprogress: boolean;
  };
  getPokemonData: () => void;
}

const HomePage: React.FC = () => {
  const [isCardSelected, setIsCardSelected] = useState(false);
  const [pokemonId, setPokemonId] = useState<number | undefined>(undefined);
  const [isFilterEnable, setIsFilterEnable] = useState(false);

  const { state, getPokemonData } = useContext(PokemonContext) as PokemonContextType;
  const { pokemonsList = [], isLoading, isLoadMoreInprogress } = state;

  const pokemonsListView = useMemo(() => {
    const uniquePokemons = pokemonsList.filter(
      (pokemon, index, self) =>
        index === self.findIndex((p) => p.id === pokemon.id)
    );

    return uniquePokemons.map((data) => (
      <div key={data.id} className="responsive">
        <PokemonCard
          data={data}
          onClick={() => {
            setPokemonId(data.id);
            toggleModal();
          }}
        />
      </div>
    ));
  }, [pokemonsList]);

  const handleLoadMoreClick = useCallback(() => {
    getPokemonData();
  }, [getPokemonData]);

  const toggleModal = useCallback(() => {
    setIsCardSelected((prev) => !prev);
  }, []);

  const isFilterEnableHandler = useCallback((isEnable: boolean) => {
    setIsFilterEnable(isEnable);
  }, []);

  return (
    <div className="home-container">
      <div className="header-container">
        <Header>
          <Row className="app-header-wrap show-grid">
            <Col xs={12} sm={12} lg={5} xl={5}>
              <div className="header-title">
                <h3>Pokédex</h3>
              </div>
            </Col>
            <Col xs={12} sm={12} lg={2} xl={2} className="hide">
              <div className="header-horizontal-line" />
            </Col>
            <Col xs={24} sm={24} lg={20} xl={20}>
              <div className="subheading">
                <span>Search for any Pokémon that exist on the planet</span>
              </div>
            </Col>
          </Row>
        </Header>

        <div>
          <AppFilter isFilterEnable={isFilterEnableHandler} />
        </div>
      </div>

      {pokemonsList.length > 0 && (
        <div>
          <div className="card-list">{pokemonsListView}</div>
          {isLoadMoreInprogress && <Apploader className="loadmore-loader" />}
          {!isFilterEnable && (
            <div className="load-more-wrap">
              <Button appearance="link" onClick={handleLoadMoreClick}>
                Load more
              </Button>
            </div>
          )}
        </div>
      )}

      {pokemonsList.length === 0 && !isLoading && (
        <div className="no-data-found">
          <span>No data found</span>
        </div>
      )}

      {isLoading && <Apploader className="app-loader-wrapper" />}

      {isCardSelected && pokemonId !== undefined && (
        <DetailPage
          isCardSelected={isCardSelected}
          toggleModal={toggleModal}
          pokemonId={pokemonId}
          offset={pokemonsList.length}
        />
      )}
    </div>
  );
};

export default HomePage;
