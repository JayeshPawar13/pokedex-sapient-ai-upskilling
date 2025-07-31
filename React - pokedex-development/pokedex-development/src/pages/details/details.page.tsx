import './details.page.scss';
import React, { useState, useEffect } from 'react';
import { Loader, Modal, Placeholder } from 'rsuite';
import {
  getPokemonDataById,
  getPokemonTypesById,
  getSpeciesDataById
} from '../../services/common.service';
import DetailsHeader from '../../components/pokemonDetailsCard/detailsHeader/detailsHeader';
import PropertyCard from '../../components/pokemonDetailsCard/propertyCard/propertyCard';
import StatCard from '../../components/pokemonDetailsCard/statCard/statCard';
import EvolutionChainCard from '../../components/pokemonDetailsCard/evolutionChainCard/evolutionChainCard';
import { PokemonCardData } from '../../components/pokemonCard/pokemonCard';



interface TypeData {
  damage_relations: {
    double_damage_from: Array<{ name: string }>;
  };
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
  offset
}) => {
  const [currentPokemonId, setCurrentPokemonId] = useState<number>(pokemonId);
  const [data, setPokemonData] = useState<PokemonCardData | null>(null);
  const [isDetailLoading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setCloseModal] = useState<boolean>(isCardSelected);
  const [pokemonSpeciesData, setPokemonSpeciesData] = useState();
  const [pokemonTypeData, setPokemonTypeData] = useState<TypeData | null>(null);

  const handleClose = () => toggleModal();

  useEffect(() => {
    if (!currentPokemonId) return;

    (async function setPokemonDetails() {
      setLoading(true);
      const response = await getPokemonDataById(currentPokemonId);
      setPokemonData(response);
      setLoading(false);

      const species = await getSpeciesDataById(currentPokemonId);
      setPokemonSpeciesData(species);

      const types = await getPokemonTypesById(currentPokemonId);
      setPokemonTypeData(types);
    })();
  }, [currentPokemonId]);

  const handleForwordClick = () => {
    if (currentPokemonId === offset) return;
    setCurrentPokemonId((prev) => prev + 1);
  };

  const handleBackwordClick = () => {
    if (currentPokemonId === 1) return;
    setCurrentPokemonId((prev) => prev - 1);
  };

  const closePopUp = () => {setCloseModal(false);handleClose()};

  return (
    <Modal
      dialogClassName="details-modal-container"
      size="md"
      open={isModalOpen}
      onClose={handleClose}
      onExited={() => setPokemonData(null)}
    >
      {data ? (
        <div className="model-container">
          <Modal.Header closeButton={false} className="rs-modal-header-2">
            {isDetailLoading ? (
              <Placeholder.Paragraph style={{ marginTop: 30 }} rows={5} graph="image" active />
            ) : (
              <div>
                <DetailsHeader
                  data={data}
                  speciesData={pokemonSpeciesData}
                  forwordClick={handleForwordClick}
                  backClick={handleBackwordClick}
                  closeClick={closePopUp}
                />
              </div>
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
          <Modal.Body>{/* Placeholder for future content */}</Modal.Body>
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
