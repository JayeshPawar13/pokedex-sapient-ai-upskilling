import { getPokcolor, POKEMON_TYPE } from '../../../constants/pokemon.types';
import './colorfulTags.scss';

export interface ColorfulTagProps {
  text: string;
  className?: string;
  type: keyof typeof POKEMON_TYPE;
}

const ColorfulTag = ({
  text,
  className = '',
  type,
}: ColorfulTagProps): JSX.Element => (
  <div className={className}>
    <span
      style={{ background: getPokcolor(type) }}
      className="colorful-tag"
    >
      {text}
    </span>
  </div>
);

export default ColorfulTag;
