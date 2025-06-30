import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

import GaiaXButton from '../../common/components/buttons/GaiaXButton';
import TextEntry from '../../common/components/fields/entry/TextEntry';
import Subtitle from '../../common/components/fields/subtitle/Subtitle';
import Title from '../../common/components/fields/title/Title';
import Header from '../../common/components/header/Header';
import DetailsContent from '../../common/components/layouts/DetailsContent';
import DetailsMainContent from '../../common/components/layouts/DetailsMainContent';
import DetailsPropertyContainer from '../../common/components/layouts/DetailsPropertyContainer';
import Main from '../../common/components/layouts/Main';
import styles from '../resources/components/ResourceDetailMainContent.module.css';

import { exampleServices } from './exampleServices';

export const ServiceDetails: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const service = exampleServices.find((s) => s.serviceId === serviceId);
  const navigate = useNavigate();

  const handleNavigationToServicePage = () => {
    navigate(service.navigationUrl);
  }

  return (
    <>
      <Header title={service.name}/>
      <Main>
        <DetailsContent>
          <DetailsMainContent>

            <DetailsPropertyContainer>
              <img src={service.imageUrl} alt={service.name} style={{ maxWidth: '300px' }} />
              <TextEntry name={'Beschreibung:'} value={service.descriptionLong} />
            </DetailsPropertyContainer>

            <Subtitle>Allgemeine Informationen</Subtitle>
            <DetailsPropertyContainer>
              <TextEntry name={'Anbieter:'} value={service.provider} />
              <TextEntry name={'Lizenzmodell:'} value={service.licenseModel} />
              <TextEntry name={'Version:'} value={service.version} />
              <TextEntry name={'Letztes Update:'} value={service.lastUpdated} />
              <TextEntry name={'Verfügbarkeit:'} value={service.availability} />
              <TextEntry name={'Preis:'} value={service.price} />
              <TextEntry name={'Zertifikate:'} value={service.certification.join(', ')} />
              <TextEntry name={'Datenschutz:'} value={service.dataPrivacyNote} />

            </DetailsPropertyContainer>

            <Subtitle>Technische Nutzung</Subtitle>
            <DetailsPropertyContainer>
              <TextEntry name={'Eingaben erforderlich:'} value={service.requiredInputs.join(', ')} />
              <TextEntry name={'Ausgabe:'} value={service.outputDescription} />
            </DetailsPropertyContainer>

            <Subtitle>Beispielhafte Anwendungsfälle</Subtitle>
            <DetailsPropertyContainer>
              {service.useCases.map((useCase, index) => (
                <TextEntry key={index} name={`Anwendungsfall ${index + 1}:`} value={useCase} />
              ))}
            </DetailsPropertyContainer>

            <DetailsPropertyContainer>
              <GaiaXButton
                label={'Kaufen'}
                handleOnClick={() => window.open(service.navigationUrl, '_blank')}
              />
              <GaiaXButton
                label={'Service starten'}
                handleOnClick={handleNavigationToServicePage}
                disabled={true}
              />
            </DetailsPropertyContainer>

          </DetailsMainContent>
        </DetailsContent>
      </Main>
    </>
  );
};

export default ServiceDetails;
