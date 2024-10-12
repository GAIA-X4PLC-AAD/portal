import Text from 'components/Text/Text';
import Title from 'components/Title/Title';
import Divider from 'components/divider/Divider';
import Subtitle from 'components/subtitle/Subtitle';
import DataField from 'data-field/DataField';
import React from 'react';

import { ISelfDescription } from '../../utils/dataMapper';

import styles from './DetailsCard.module.css';

export interface IDetailsCard extends ISelfDescription {
}

interface IDetailsCardProps {
  cardData: IDetailsCard;
}

export default function DetailsCard({ cardData }: Readonly<IDetailsCardProps>) {
  console.log('What to work with: ', cardData);

  // Ensure cardData.items is an array and has data
  const propertiesList =
    cardData && cardData.items
      ? cardData.items.map((item) => item['properties(n)'])
      : [];
  console.log('Property list: ', propertiesList);

  // Temporary solution to extract name and description for our Card. Will be refactored once we have a better paylaod structure
  let name, description;
  if (cardData && cardData.items && cardData.items.length > 0) {
    const propertiesN = cardData.items[0]['properties(n)'];
    name = propertiesN.name;
    description = propertiesN.description;
  }

  // Extracting the general properties from our propertiesList for Details part of our Card
  const generalPropertiesList = propertiesList.flatMap((properties) =>
    Object.entries(properties)
      .filter(([key, _]) => /general/i.test(key))
      .map(([key, value]) => ({ [key]: value }))
  );

  // Extracting the Related Offerings properties for lower part of our Card
  const otherPropertiesList = propertiesList.flatMap((properties) =>
    Object.entries(properties)
      .filter(([key, _]) => !/general/i.test(key))
      .map(([key, value]) => ({ [key]: value }))
  );

  return (
    <div className={styles['details-card-container']}>
      <Title>{name as string}</Title>
      <Text>{description as string}</Text>
      <Divider />
      <Subtitle>General Information:</Subtitle>
      <div className={styles['details-grid-container']}>
        {generalPropertiesList &&
          generalPropertiesList.map((properties, index) =>
            Object.entries(properties).map(([label, content]) => {
              if (content !== 'Unknown') {
                return (
                  <DataField
                    key={`${label}-${index}`}
                    label={label}
                    content={String(content)}
                  />
                );
              }
              return <></>
            })
          )}
      </div>
      <Divider />
      <Subtitle>Details:</Subtitle>
      <div className={styles['details-grid-container']}>
        {otherPropertiesList &&
          otherPropertiesList.map((properties, index) =>
            Object.entries(properties).map(([label, content]) => {
              if (
                label !== 'name' &&
                label !== 'description' &&
                content !== 'Unknown'
              ) {
                return (
                  <DataField
                    key={`${label}-${index}`}
                    label={label}
                    content={String(content)}
                  />
                );
              }
              return <></>
            })
          )}
      </div>
    </div>
  );
}
