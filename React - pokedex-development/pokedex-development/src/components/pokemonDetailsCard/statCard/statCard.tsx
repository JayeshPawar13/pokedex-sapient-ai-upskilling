import React from 'react';
import { Grid, Row, Col } from 'rsuite';
import { getCamleCaseString } from '../../../constants/pokemon.types';
import './statCard.scss';

interface StatItem {
  base_stat: number;
  stat: {
    name: string;
  };
}

interface StatCardProps {
  stats: StatItem[];
}

const StatCard = ({ stats }: StatCardProps): JSX.Element => {
  const getStatHeading = (name: string): string => {
    if (name === 'hp') {
      return 'HP';
    }

    const [firstName, lastName] = name.split('-');

    if (firstName === 'special' && lastName) {
      return `Sp. ${getCamleCaseString(lastName)}`;
    }

    return getCamleCaseString(firstName);
  };

  return (
    <section className="stat-container" aria-label="Pokemon stats">
      <div className="stat-card">
        <header>
          <h2 className="stat-header">Stats</h2>
        </header>
        <Grid fluid>
          <Row className="show-grid">
            {stats?.map(({ base_stat, stat: { name } }) => (
              <Col
                key={name}
                className="pl-0 pt-1"
                lg={12}
                xl={12}
                xs={24}
                sm={24}
              >
                <div className="stat-flex-row">
                  <Col xs={4} lg={8} xl={8} className="pl-0 pr-0">
                    <span className="prop-header">{getStatHeading(name)}</span>
                  </Col>
                  <Col xs={8} lg={10} xl={10} className="pl-0 pr-0">
                    <div className="prop-header-data">
                      <span className="stat-data">{base_stat}</span>
                      <progress value={base_stat} max={100}>
                        {base_stat}
                      </progress>
                    </div>
                  </Col>
                </div>
              </Col>
            ))}
          </Row>
        </Grid>
      </div>
    </section>
  );
};

export default StatCard;
