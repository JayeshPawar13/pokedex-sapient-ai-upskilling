import { getBackground, PokemonType } from '../../constants/pokemon.types';
import { numberFormation } from '../../services/common.service';
import './pokemonCard.scss';

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
  }[];
}

export interface PokemonCardProps {
  data: PokemonCardData;
  onClick?: () => void;
  className?: string;
}

const PokemonCard = ({
  data,
  onClick,
  className = '',
}: PokemonCardProps): JSX.Element => {
  const backgroundStyle = { background: getBackground(data.types) };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (onClick && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className={`${className} card`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyUp={onClick ? handleKeyPress : undefined}
      style={backgroundStyle}
    >
      <div className="image-container">
        <img
          src={
            data.sprites.other?.dream_world?.front_default ||
            data.sprites.front_default ||
            'https://via.placeholder.com/150'
          }
          alt={data.name}
        />
      </div>
      <div className="text-container">
        <strong>{data.name}</strong>
        <span>{numberFormation(data.id)}</span>
      </div>
    </div>
  );
};

export default PokemonCard;
