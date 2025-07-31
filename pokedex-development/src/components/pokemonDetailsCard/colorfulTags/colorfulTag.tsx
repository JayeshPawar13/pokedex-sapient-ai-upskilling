
import React from 'react';
import { getPokcolor, POKEMON_TYPE } from '../../../constants/pokemon.types';
import "./colorfulTags.scss";

export interface ColorfulTagProps {
  text: string;
  className?: string;
  type: keyof typeof POKEMON_TYPE;
}

const ColorfulTag: React.FC<ColorfulTagProps> = ({ text, className, type }) => {
    return (
        <div>
            <div className={className}>
                <span style={{
                    background: getPokcolor(type)
                }} className="colorful-tag">{text}</span>
            </div>
        </div>
    )
}

export default ColorfulTag;