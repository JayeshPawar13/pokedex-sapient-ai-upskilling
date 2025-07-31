import React from "react";
import PokemonCard, { PokemonCardData } from "../../pokemonCard/pokemonCard";
import AppTooltip from "../../../hooks/tooltip/tooltip";
import backIcon from "../../../assets/icons/back-icon.png";
import closeIcon from "../../../assets/icons/close-icon.png";
import rightIcon from "../../../assets/icons/right-icon.png";
import { numberFormation } from "../../../services/common.service";
import { getPokemonDescription } from "../../../constants/pokemon.types";
import "./detailsHeader.scss";
import "../../../styles/common.scss";

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
  forwordClick?: () => void;
}

const DetailsHeader: React.FC<DetailsHeaderProps> = ({
  data,
  speciesData,
  backClick,
  closeClick,
  forwordClick
}) => {
  const getPokemonDescriptions = (): string => {
    if (speciesData?.flavor_text_entries) {
      return getPokemonDescription(speciesData.flavor_text_entries);
    }
    return "";
  };

  const description = getPokemonDescriptions();

  return (
    <div className="details-header-container">
      <div className="header-wrap">
        <div>
          <PokemonCard className="disabled-click" key={data.id} data={data} />
        </div>
        <div className="header-sub-wrap pl-3">
          <div className="title-wrap">
            <div>
              <h3 className="text-caps">{data.name}</h3>
            </div>
            <div className="horizontal-line"></div>
            <div>
              <h3>{numberFormation(data.id)}</h3>
            </div>
            <div className="horizontal-line"></div>
            <div>
              <div className="icon-wrap">
                <img
                  src={backIcon}
                  alt="back icon"
                  onClick={backClick}
                  role="presentation"
                />
                <img
                  src={closeIcon}
                  alt="close icon"
                  onClick={closeClick}
                  role="presentation"
                />
                <img
                  src={rightIcon}
                  alt="forward icon"
                  onClick={forwordClick}
                  role="presentation"
                />
              </div>
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
