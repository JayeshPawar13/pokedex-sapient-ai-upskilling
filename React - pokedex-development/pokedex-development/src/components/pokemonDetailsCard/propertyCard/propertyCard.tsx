import React from 'react';
import { Grid, Row, Col } from 'rsuite';
import { getCamleCaseString } from '../../../constants/pokemon.types';
import ColorfulTag, { ColorfulTagProps } from '../colorfulTags/colorfulTag';
import './propertyCard.scss';
import '../../../styles/common.scss';

interface SpeciesData {
  egg_groups?: { name: string }[];
}

interface Ability {
  ability: {
    name: string;
  };
}

interface Type {
  type: {
    name: ColorfulTagProps['type'];
  };
}

interface DamageRelation {
  name: ColorfulTagProps['type'];
}

interface PokemonTypeData {
  damage_relations?: {
    double_damage_from?: DamageRelation[];
  };
}

interface Data {
  height?: number;
  weight?: number;
  abilities?: Ability[];
  types?: Type[];
}

interface PropertyCardProps {
  speciesData: SpeciesData;
  data: Data;
  pokemonTypeData: PokemonTypeData;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ speciesData, data, pokemonTypeData }) => {
  const eggGroups = speciesData?.egg_groups ?? [];
  const abilities = data?.abilities ?? [];
  const types = data?.types ?? [];
  const weaknesses = pokemonTypeData?.damage_relations?.double_damage_from ?? [];

  const renderList = (list: any[], extractor: (item: any) => string) =>
    list.length > 0
      ? list.map((item, index) => (
          <span key={extractor(item)} className="prop-header-data">
            {getCamleCaseString(extractor(item))}
            {index !== list.length - 1 && ', '}
          </span>
        ))
      : <span className="prop-header-data">Unknown</span>;

  return (
    <div className="property-container">
      <Grid fluid>
        <Row className="show-grid">
          <Col xs={12} sm={12} lg={6} xl={6}>
            <div className="flex-col">
              <div><span className="prop-header">Height</span></div>
              <div className="prop-header-data">{data?.height ?? '-'}</div>
            </div>
          </Col>

          <Col xs={12} sm={12} lg={6} xl={6}>
            <div className="flex-col">
              <div><span className="prop-header">Weight</span></div>
              <div className="prop-header-data">
                {data?.weight ? `${data.weight / 10} Kg` : '-'}
              </div>
            </div>
          </Col>

          <Col xs={12} sm={12} lg={6} xl={6}>
            <div className="flex-col">
              <div><span className="prop-header">Gender(s)</span></div>
              <div className="prop-header-data">Male, Female</div>
            </div>
          </Col>

          <Col xs={12} sm={12} lg={6} xl={6}>
            <div className="flex-col">
              <div><span className="prop-header">Egg Groups</span></div>
              {renderList(eggGroups, item => item.name)}
            </div>
          </Col>
        </Row>

        <Row className="show-grid pt-3">
          <Col xs={12} sm={12} lg={6} xl={6}>
            <div className="flex-col">
              <div><span className="prop-header">Abilities</span></div>
              {renderList(abilities, item => item.ability.name)}
            </div>
          </Col>

          <Col xs={12} sm={12} lg={6} xl={6}>
            <div className="flex-col">
              <div><span className="prop-header">Types</span></div>
              <div className="prop-header-data type-wrap">
                {types.length > 0 ? (
                  types.map((item, index) => (
                    <ColorfulTag
                      key={`${item.type.name}-${index}`}
                      className="pr-1"
                      type={item.type.name}
                      text={getCamleCaseString(item.type.name)}
                    />
                  ))
                ) : (
                  <span className="prop-header-data">Unknown</span>
                )}
              </div>
            </div>
          </Col>

          <Col xs={12} sm={12} lg={12} xl={12}>
            <div className="flex-col">
              <div><span className="prop-header">Weak Against</span></div>
              <div className="prop-header-data type-wrap">
                {weaknesses.length > 0 ? (
                  weaknesses.map((item, index) => (
                    <ColorfulTag
                      key={`${item.name}-${index}`}
                      className="pr-1"
                      type={item.name}
                      text={getCamleCaseString(item.name)}
                    />
                  ))
                ) : (
                  <span className="prop-header-data">None</span>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default PropertyCard;
