import React from 'react';
import { Grid, Row, Col } from 'rsuite';
import { getCamleCaseString } from '../../../constants/pokemon.types';
import ColorfulTag from '../colorfulTags/colorfulTag';
import './propertyCard.scss';
import '../../../styles/common.scss';
import PropTypes from 'prop-types';

const PropertyCard = ({ speciesData , data, pokemonTypeData }) => {
  const eggGroups = speciesData.egg_groups ?? [];
  const abilities = data.abilities ?? [];
  const types = data.types ?? [];
  const weaknesses = pokemonTypeData.damage_relations?.double_damage_from ?? [];

  return (
    <div className="property-container">
      <Grid fluid>
        <Row className="show-grid">
          <Col xs={12} sm={12} lg={6} xl={6}>
            <div className="flex-col">
              <div><span className="prop-header">Height</span></div>
              <div className="prop-header-data">{data.height ?? '-'}</div>
            </div>
          </Col>
          <Col xs={12} sm={12} lg={6} xl={6}>
            <div className="flex-col">
              <div><span className="prop-header">Weight</span></div>
              <div className="prop-header-data">{data.weight ? `${data.weight / 10} Kg` : '-'}</div>
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
              {eggGroups.length > 0 ? (
                eggGroups.map((item, index) => (
                  <span key={item.name} className="prop-header-data">
                    {getCamleCaseString(item.name)}
                    {index !== eggGroups.length - 1 && ', '}
                  </span>
                ))
              ) : (
                <span className="prop-header-data">Unknown</span>
              )}
            </div>
          </Col>
        </Row>

        <Row className="show-grid pt-3">
          <Col xs={12} sm={12} lg={6} xl={6}>
            <div className="flex-col">
              <div><span className="prop-header">Abilities</span></div>
              {abilities.length > 0 ? (
                abilities.map((item, index) => (
                  <span key={item.ability.name} className="prop-header-data">
                    {getCamleCaseString(item.ability.name)}
                    {index !== abilities.length - 1 && ', '}
                  </span>
                ))
              ) : (
                <span className="prop-header-data">Unknown</span>
              )}
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

PropertyCard.propTypes = {
  speciesData: PropTypes.object,
  data: PropTypes.object,
  pokemonTypeData: PropTypes.object,
};

export default PropertyCard;
