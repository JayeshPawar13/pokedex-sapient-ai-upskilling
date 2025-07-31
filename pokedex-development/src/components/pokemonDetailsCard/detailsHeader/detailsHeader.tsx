import React from 'react';
import PokemonCard, { PokemonCardData } from '../../pokemonCard/pokemonCard';
import AppTooltip from '../../../hooks/tooltip/tooltip';
import backIcon from '../../../assets/icons/back-icon.png';
import closeIcon from '../../../assets/icons/close-icon.png';
import rightIcon from '../../../assets/icons/right-icon.png';
import { numberFormation } from '../../../services/common.service';
import { getPokemonDescription } from '../../../constants/pokemon.types';
import './detailsHeader.scss';
import '../../../styles/common.scss';

interface FlavorTextEntry {
  flavor_text: string;
  language: {
    name: string;
  };
}

interface SpeciesData {
  flavor_text_entries?: FlavorTextEntry[];
}

interface DetailsHeaderProps {
  data: PokemonCardData;
  speciesData?: SpeciesData;
  backClick?: () => void;
  closeClick?: () => void;
  forwardClick?: () => void; // Fixed spelling here
}

const DetailsHeader: React.FC<DetailsHeaderProps> = ({
  data,
  speciesData,
  backClick,
  closeClick,
  forwardClick,
}): JSX.Element => {
  const getPokemonDescriptions = (): string => {
    if (speciesData?.flavor_text_entries) {
      return getPokemonDescription(speciesData.flavor_text_entries);
    }
    return '';
  };

  const description = getPokemonDescriptions();

  return (
    <div className="details-header-container">
      <div className="header-wrap">
        <PokemonCard className="disabled-click" key={data.id} data={data} />
        <div className="header-sub-wrap pl-3">
          <div className="title-wrap">
            <h3 className="text-caps">{data.name}</h3>
            <div className="horizontal-line" />
            <h3>{numberFormation(data.id)}</h3>
            <div className="horizontal-line" />
            <div className="icon-wrap">
              <button type="button" onClick={backClick} aria-label="Go back" className="icon-button">
                <img src={backIcon} alt="Back" />
              </button>
              <button type="button" onClick={closeClick} aria-label="Close" className="icon-button">
                <img src={closeIcon} alt="Close" />
              </button>
              <button type="button" onClick={forwardClick} aria-label="Go forward" className="icon-button">
                <img src={rightIcon} alt="Forward" />
              </button>
            </div>
          </div>
          <div className="text-description">
            <div className="text-dot">
              <span>{description.substring(0, 363)} </span>
            </div>
            <div className="text-dot">... </div>
            {description.length > 363 && (
              <AppTooltip
                placement="bottom"
                className="load-more"
                tooltipClass="tooltip-popover"
                name="read more"
                data={description}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsHeader;
