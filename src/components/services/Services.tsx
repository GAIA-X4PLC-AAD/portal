/* test coverage not required */
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Header from '../../common/components/header/Header';
import Horizontal from '../../common/components/layouts/Horizontal';
import Main from '../../common/components/layouts/Main';
import Vertical from '../../common/components/layouts/Vertical';
import SearchBar from '../../common/components/searchBar/SearchBar';
import { Service } from '../../types/services.model';
import CardContainer from '../cards/CardContainer';

import ServiceCard from './ServiceCard';
import styles from './Services.module.css'
import { exampleServices } from './exampleServices';

const services = exampleServices;

const Services: FC = () => {
  const { t } = useTranslation();
  const [filteredServices, setFilteredServices] = useState<Service[]>(services);

  const updateSearchText = (query: string) => {
    const lowerQuery = query.toLowerCase();
    setFilteredServices(
      services.filter(service =>
        service.name.toLowerCase().includes(lowerQuery) ||
                service.descriptionShort.toLowerCase().includes(lowerQuery)
      )
    );
  };

  return (
    <>
      <Header title={`${t('left-menu.services')} (${services.length} ${t('dashboard.results')})`}/>
      <Main>
        <Vertical className={styles.mainConainer}>
          <Horizontal
            className={styles.searchBarContainer}
          >
            <SearchBar
              placeholder={t('resources.search-bar-text')}
              onSearch={updateSearchText}
            />
          </Horizontal>
          <Horizontal className={styles.contentContainer}>
            <CardContainer visible={true}>
              {
                filteredServices.map((service) => (
                  <ServiceCard key={service.serviceId} serviceCardData={service}/>
                ))
              }
            </CardContainer>
          </Horizontal>
        </Vertical>
      </Main>
    </>
  );
};

export default Services;
