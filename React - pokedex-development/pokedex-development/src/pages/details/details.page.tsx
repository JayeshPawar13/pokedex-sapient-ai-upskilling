import './details.page.scss';
import React, { useState, useEffect } from 'react';
import { Loader, Modal, Placeholder } from 'rsuite';
import {
  getPokemonDataById,
  getPokemonTypesById,
  getSpeciesDataById,
} from '../../services/common.service';
import DetailsHeader from '../../components/pokemonDetailsCard/detailsHeader/detailsHeader';
import PropertyCard, { PokemonTypeData } from '../../components/pokemonDetailsCard/propertyCard/propertyCard';
import StatCard from '../../components/pokemonDetailsCard/statCard/statCard';
import EvolutionChainCard from '../../components/pokemonDetailsCard/evolutionChainCard/evolutionChainCard';
import { PokemonCardData } from '../../components/pokemonCard/pokemonCard';

interface FlavorTextEntry {
  flavor_text: string;
  language: {
    name: string;
  };
}

interface SpeciesData {
  flavor_text_entries?: FlavorTextEntry[];
  egg_groups?: { name: string }[];
  // add more fields as necessary based on your API response
}

interface DetailPageProps {
  isCardSelected: boolean;
  toggleModal: () => void;
  pokemonId: number;
  offset: number;
}

const DetailPage: React.FC<DetailPageProps> = ({
  isCardSelected,
  toggleModal,
  pokemonId,
  offset,
}) => {
  const [currentPokemonId, setCurrentPokemonId] = useState<number>(pokemonId);
  const [data, setPokemonData] = useState<PokemonCardData | null>(null);
  const [isDetailLoading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(isCardSelected);
  const [pokemonSpeciesData, setPokemonSpeciesData] = useState<SpeciesData | null>(null);
  const [pokemonTypeData, setPokemonTypeData] = useState<PokemonTypeData | null>(null);

  useEffect(() => {
    setIsModalOpen(isCardSelected);
  }, [isCardSelected]);

  useEffect(() => {
    if (!currentPokemonId) return;

    const fetchPokemonDetails = async () => {
      setLoading(true);
      try {
        const [pokemonResponse, speciesResponse, typesResponse] = await Promise.all([
          getPokemonDataById(currentPokemonId),
          getSpeciesDataById(currentPokemonId),
          getPokemonTypesById(currentPokemonId),
        ]);

        setPokemonData(pokemonResponse);
        setPokemonSpeciesData(speciesResponse);
        setPokemonTypeData(typesResponse);
      } catch (error) {
        console.error('Failed to fetch Pokémon details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [currentPokemonId]);

  const handleForwardClick = () => {
    if (currentPokemonId < offset) {
      setCurrentPokemonId((prev) => prev + 1);
    }
  };

  const handleBackwardClick = () => {
    if (currentPokemonId > 1) {
      setCurrentPokemonId((prev) => prev - 1);
    }
  };

  const closePopUp = () => {
    setIsModalOpen(false);
    toggleModal();
    setPokemonData(null);
    setPokemonSpeciesData(null);
    setPokemonTypeData(null);
  };

  return (
    <Modal
      dialogClassName="details-modal-container"
      size="md"
      open={isModalOpen}
      onClose={closePopUp}
      onExited={() => setPokemonData(null)}
    >
      {data ? (
        <div className="model-container">
          <Modal.Header closeButton={false} className="rs-modal-header-2">
            {isDetailLoading ? (
              <Placeholder.Paragraph
                style={{ marginTop: 30 }}
                rows={5}
                graph="image"
                active
              />
            ) : (
              <DetailsHeader
                data={data}
                speciesData={pokemonSpeciesData ?? undefined}
                forwordClick={handleForwardClick}
                backClick={handleBackwardClick}
                closeClick={closePopUp}
              />
            )}

            <div className="padding-components">
              {pokemonTypeData && pokemonSpeciesData && (
                <PropertyCard
                  speciesData={pokemonSpeciesData}
                  data={data}
                  pokemonTypeData={pokemonTypeData}
                />
              )}
            </div>
            <div className="padding-components">
              {data.stats && <StatCard stats={data.stats} />}
            </div>
            <div className="padding-components">
              <EvolutionChainCard data={data} />
            </div>
          </Modal.Header>
          <Modal.Body />
        </div>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <Loader size="md" />
        </div>
      )}
    </Modal>
  );
};

export default DetailPage;
