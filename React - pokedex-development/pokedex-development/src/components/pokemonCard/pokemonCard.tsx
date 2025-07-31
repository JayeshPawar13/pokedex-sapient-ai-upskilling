
import React from 'react';
import { getBackground, PokemonType } from "../../constants/pokemon.types";
import { numberFormation } from "../../services/common.service";
import "./pokemonCard.scss";

// Remove local PokemonType declaration and use the one from constants/pokemon.types

export interface PokemonSprites {
  other?: {
    dream_world?: {
      front_default?: string;
    };
  };
  front_default?: string;
}

export interface PokemonCardData {
  name: string;
  id: number;
  types: PokemonType[];
  sprites: PokemonSprites;
  stats?: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[]; // Optional stats field
  // add more fields as needed
}

export interface PokemonCardProps {
  data: PokemonCardData;
  onClick?: () => void;
  className?: string;
}


const PokemonCard: React.FC<PokemonCardProps> = ({ data, onClick, className }) => {
    return (
        <>
            <div className={`${className} card`} onClick={onClick} role="presentation" style={{
                background: getBackground(data.types)
            }}>
                <div className="image-container">
                    <img src={
                        data.sprites.other?.dream_world?.front_default ||
                        data.sprites.front_default || "https://via.placeholder.com/150"
                    } alt="Avatar" />
                </div>
                <div className="text-container">
                    <strong><b>{data.name}</b></strong>
                    <span>{numberFormation(data.id)}</span>
                </div>
            </div>
        </>
    )
}


export default PokemonCard;