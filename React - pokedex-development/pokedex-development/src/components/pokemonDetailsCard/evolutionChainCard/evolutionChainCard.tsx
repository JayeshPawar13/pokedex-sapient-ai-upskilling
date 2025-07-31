import React from 'react';
import './evolutionChainCard.scss';
import '../../../styles/common.scss';
import PokemonCard, { PokemonCardData } from '../../pokemonCard/pokemonCard';
import rightArrowIcon from '../../../assets/icons/right-arrow.png';

interface EvolutionChainCardProps {
  data: PokemonCardData;
}

const EvolutionChainCard: React.FC<EvolutionChainCardProps> = ({ data }) => {
  const evolutionStages = [1, 2, 3];

  return (
    <div className="evol-container">
      <div className="evol-wrap evolu-break">
        {evolutionStages.map((stage, index) => (
          <div className="flex-row" key={stage}>
            <div className="pt-2">
              <PokemonCard className="disabled-click" data={data} />
            </div>
            {index < evolutionStages.length - 1 && (
              <div className="evol-next-arrow">
                <img
                  src={rightArrowIcon}
                  alt="Evolution stage arrow"
                  aria-hidden="true"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EvolutionChainCard;
